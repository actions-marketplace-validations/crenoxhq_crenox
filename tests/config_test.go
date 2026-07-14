package tests

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/crenoxhq/crenox/v2/internal/config"
)

func TestConfigLoad_Default(t *testing.T) {
	// If no file is provided, it should load the default config
	cfg, err := config.Load("")
	if err != nil {
		t.Fatalf("expected no error loading default config, got %v", err)
	}

	if cfg.EntropyThreshold != 4.5 {
		t.Errorf("expected default entropy threshold 4.5, got %f", cfg.EntropyThreshold)
	}
	if cfg.MinSecretLength != 20 {
		t.Errorf("expected default min secret length 20, got %d", cfg.MinSecretLength)
	}
}

func TestConfigLoad_File(t *testing.T) {
	// Create a temporary config file
	tmpDir := t.TempDir()
	cfgPath := filepath.Join(tmpDir, ".crenox.yaml")

	yamlContent := `
entropy_threshold: 3.2
min_secret_length: 15
disable_tiers:
  entropy: true
  context: false
`
	err := os.WriteFile(cfgPath, []byte(yamlContent), 0644)
	if err != nil {
		t.Fatalf("failed to write temp config file: %v", err)
	}

	cfg, err := config.Load(cfgPath)
	if err != nil {
		t.Fatalf("expected no error loading config file, got %v", err)
	}

	if cfg.EntropyThreshold != 3.2 {
		t.Errorf("expected entropy threshold 3.2, got %f", cfg.EntropyThreshold)
	}
	if cfg.MinSecretLength != 15 {
		t.Errorf("expected min secret length 15, got %d", cfg.MinSecretLength)
	}
	if !cfg.DisableTiers.Entropy {
		t.Errorf("expected disable_tiers.entropy to be true")
	}
}

func TestConfigLoad_InvalidFile(t *testing.T) {
	// Provide a path that doesn't exist explicitly
	cfg, err := config.Load("/path/that/does/not/exist.yaml")
	if err != nil {
		t.Fatalf("expected no error (fallback to default) loading non-existent file, got %v", err)
	}

	if cfg.EntropyThreshold != 4.5 {
		t.Errorf("expected default entropy threshold 4.5, got %f", cfg.EntropyThreshold)
	}
}
