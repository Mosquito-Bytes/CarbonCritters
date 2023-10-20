fe_dir := "frontend"
be_dir := "backend"

fe_app_dir := clean(fe_dir + "/packages/app")
fe_mocks_dir := clean(fe_dir + "/packages/mocks")

default:
    just --list
# -----
# frontend start

fe_init:
    npm i -g pnpm@latest;
    cd {{join(justfile_directory(), fe_dir)}}; pnpm install;

# Start mock server
fe_start_mocks:
    cd {{fe_mocks_dir}}; ./node_modules/.bin/mocks-server;

# Start development server
fe_start_dev:
    cd {{fe_app_dir}}; ./node_modules/.bin/vite;

# Build frontend for production
fe_build: fe_init
    cd {{fe_app_dir}}; ./node_modules/.bin/vite build;

# Preview frontend prod build locally
fe_preview: fe_init
    cd {{fe_app_dir}}; ./node_modules/.bin/vite preview;

# Start mocks and dev server
fe_start:
    #!/usr/bin/env bash
    just fe_start_mocks &
    just fe_start_dev

fe_format:
    prettier --write {{fe_dir}}
# frontend end
# -----

# -----
# backend start
# backend end
# -----
