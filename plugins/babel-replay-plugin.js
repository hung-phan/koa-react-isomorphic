import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from 'app/server/schema/schema.json';

export default getBabelRelayPlugin(schema.data);
