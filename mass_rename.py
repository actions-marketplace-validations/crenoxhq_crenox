import os

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return

    original = content
    # Order matters!
    content = content.replace('github.com/sentinel-cli/sentinel', 'github.com/crenoxhq/crenox')
    content = content.replace('sentinel-cli', 'crenoxhq')
    content = content.replace('Sentinel', 'Crenox')
    content = content.replace('SENTINEL', 'CRENOX')
    content = content.replace('sentinel', 'crenox')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def main():
    root_dir = '/root/sentinel'
    ignore_dirs = {'.git', '.github', 'dist', 'bin'}
    ignore_exts = {'.exe', '.bin', '.tar.gz', '.png', '.jpg', '.cast', '.tape'}

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Remove ignored directories from traversal
        dirnames[:] = [d for d in dirnames if d not in ignore_dirs]

        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext in ignore_exts or filename == 'mass_rename.py' or filename == 'rename_analysis.sh':
                continue
            
            filepath = os.path.join(dirpath, filename)
            replace_in_file(filepath)

    # Now rename files/folders
    try:
        if os.path.exists('/root/sentinel/cmd/sentinel'):
            os.rename('/root/sentinel/cmd/sentinel', '/root/sentinel/cmd/crenox')
            print("Renamed: cmd/sentinel -> cmd/crenox")
    except Exception as e:
        print(f"Error renaming folder: {e}")

    try:
        if os.path.exists('/root/sentinel/.sentinel.yaml.example'):
            os.rename('/root/sentinel/.sentinel.yaml.example', '/root/sentinel/.crenox.yaml.example')
            print("Renamed: .sentinel.yaml.example -> .crenox.yaml.example")
    except Exception as e:
        print(f"Error renaming file: {e}")

if __name__ == '__main__':
    main()
