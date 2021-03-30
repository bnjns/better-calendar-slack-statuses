#!/usr/bin/env bash
set -eo pipefail

clean() {
  echo ":: Cleaning"
  rm -rf dist*
  rm -rf package
}

compile() {
  clean

  echo ":: Compiling"
  yarn --frozen-lockfile 1> /dev/null
  yarn tsc 1> /dev/null

  echo ":: Installing production dependencies"
  cp package.json dist
  cp yarn.lock dist
  pushd dist &> /dev/null
  yarn --production --frozen-lockfile 1> /dev/null
  rm package.json
  rm yarn.lock
  popd &> /dev/null
}

buildLambda() {
  compile

  echo ":: Compressing"
  zip -r dist.zip * 1> /dev/null
  rm -rf dist/
}

buildPackage() {
  compile

  echo ":: Packaging"
  rm -rf package
  pkg dist/bin.js \
    -t node14.4.0-linux-x64,node14.4.0-macos-x64,node14.4.0-win-x64 \
    --out-path package 1> /dev/null
}

readonly rootDir="$(dirname $(realpath $0))/.."

pushd "${rootDir}" &> /dev/null

readonly action="${1}"
case ${action} in
  --lambda)
    buildLambda
    ;;
  --package)
    buildPackage
    ;;
  *)
    compile
    ;;
esac

popd &> /dev/null


