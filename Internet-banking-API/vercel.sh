if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then 
  echo "This is our main branch"
  pnpm run build
else 
  echo "This is not our main branch"
  pnpm run build:not-main
fi