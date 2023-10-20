set dotenv-load
set positional-arguments

fe_dir := "./frontend"
be_dir := "./backend"

default:
    just --list
# -----
# frontend start

# Start mock server
fe_start_mocks:
    echo "start mocks"

# Start development server
fe_start_dev:
    cd {{fe_dir}}; ./node_modules/.bin/vite;

# Build frontend for production
fe_build:
    cd {{fe_dir}}; ./node_modules/.bin/tsc && ./node_modules/.bin/vite build;

# Preview frontend prod build locally
fe_preview:
    cd {{fe_dir}}; ./node_modules/.bin/vite preview;

# Start mocks and dev server
fe_start:
    just fe_start_mocks &
    just fe_start_dev
# frontend end
# -----

# -----
# backend start
# backend end
# -----
