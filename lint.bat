@echo off
start cmd /k "cd server &&yarn prettier --write "src/**/*.{js,ts}""
start cmd /k "cd client&&yarn prettier --write "src/**/*.{js,jsx,ts,tsx}"" 
