package updater

import "testing"

func TestIsNewer(t *testing.T) {
	cases := []struct {
		latest  string
		current string
		want    bool
	}{
		{"v1.2.3", "v1.2.2", true},
		{"v1.3.0", "v1.2.9", true},
		{"v2.0.0", "v1.9.9", true},
		{"v1.2.3", "v1.2.3", false},
		{"v1.2.2", "v1.2.3", false},
		{"1.0.1", "1.0.0", true},
		{"v1.1", "v1.0", true},
		{"", "v1.0.0", false},
		{"v2.0.0", "dev", false}, // dev builds don't show update prompts
	}

	for _, tc := range cases {
		if got := isNewer(tc.latest, tc.current); got != tc.want {
			t.Errorf("isNewer(%q, %q) = %v; want %v", tc.latest, tc.current, got, tc.want)
		}
	}
}
