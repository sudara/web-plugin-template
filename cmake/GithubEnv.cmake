set (env_file "${PROJECT_SOURCE_DIR}/.env")
message ("Writing ENV file for CI: ${env_file}")

# the first call truncates, the rest append
file(WRITE  "${env_file}" "PLUGIN_NAME=${PluginName}\n")
file(APPEND "${env_file}" "VERSION=${CURRENT_VERSION}\n")