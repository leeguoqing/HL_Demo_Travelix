# travel_hl_js
A travel template integrated with hosted login ,by OIDC javascript client, running within node.js

Already include the oidc client libaray.

Please run the command to recreate node_nodules folder which is not included in the repository:

npm install npm

Please edit config file before run npm start:

cd public
vi config.js

Find the configuratin rows start/end  with //#################### . And replace the parameters as yours.

If you want change port:

cd bin
vi www

Edit the port in "var port = normalizePort(process.env.PORT || '3000');", from 3000 to anything else.

Once you have done, come back to the directory root, and run:

npm start

Visit http://localhost:3000 to test hosted login.

New features will be added later.