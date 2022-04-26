#!/bin/bash
#
#   Add package.json files to cjs/esm subtrees
#

cat >lib/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >lib/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF

find src -name '*.d.ts' -exec cp {} lib/esm \;
find src -name '*.d.ts' -exec cp {} lib/cjs \;