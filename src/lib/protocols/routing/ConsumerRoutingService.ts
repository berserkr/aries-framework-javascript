import logger from '../../logger';
import { createOutboundMessage } from '../helpers';
import { AgentConfig } from '../../agent/AgentConfig';
import { MessageSender } from '../../agent/MessageSender';
import { KeylistUpdateMessage, KeylistUpdate, KeylistUpdateAction } from '../coordinatemediation/KeylistUpdateMessage';

class ConsumerRoutingService {
  messageSender: MessageSender;
  agentConfig: AgentConfig;

  constructor(messageSender: MessageSender, agentConfig: AgentConfig) {
    this.messageSender = messageSender;
    this.agentConfig = agentConfig;
  }

  async createRoute(verkey: Verkey) {
    logger.log('Creating route...');

    if (!this.agentConfig.inboundConnection) {
      logger.log('There is no agency. Creating route skipped.');
    } else {
      const routingConnection = this.agentConfig.inboundConnection.connection;

      const keylistUpdateMessage = new KeylistUpdateMessage({
        updates: [
          new KeylistUpdate({
            action: KeylistUpdateAction.add,
            recipientKey: verkey,
          }),
        ],
      });

      const outboundMessage = createOutboundMessage(routingConnection, keylistUpdateMessage);
      await this.messageSender.sendMessage(outboundMessage);
    }
  }
}

export { ConsumerRoutingService };
