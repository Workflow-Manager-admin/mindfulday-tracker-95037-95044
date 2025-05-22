#!/bin/bash
cd /home/kavia/workspace/code-generation/mindfulday-tracker-95037-95044/mindfulday_tracker
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

