#!/bin/bash

COMMIT_MSG_COMMAND=".git/hooks/commit-msg \$1"
PRE_COMMIT_COMMAND="yarn lint-staged"
PRE_PUSH_COMMAND="yarn test:ci"

echo "$COMMIT_MSG_COMMAND" > .husky/commit-msg
echo "$PRE_COMMIT_COMMAND" > .husky/pre-commit
echo "$PRE_PUSH_COMMAND" > .husky/pre-push

chmod +x .husky/commit-msg
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

echo "Hooks do Husky configurados!"