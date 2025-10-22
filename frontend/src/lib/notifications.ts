import { PushAPI } from '@pushprotocol/restapi';

/**
 * Send a Push Protocol notification
 * @param signer - The signer object (wallet provider)
 * @param chainNamespace - The chain namespace (e.g., 'eip155', 'solana')
 * @param chainId - The chain ID (e.g., '11155111', 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1')
 * @param owner - The owner address
 * @param reason - The reason for the alert
 */
export const sendAlert = async (
  signer: any,
  chainNamespace: string,
  chainId: string,
  owner: string,
  reason: string
) => {
  try {
    let caip10: string;
    
    // Construct CAIP-10 identifier based on chain namespace
    if (chainNamespace === 'eip155') {
      caip10 = `eip155:${chainId}:${owner}`;
    } else if (chainNamespace === 'solana') {
      caip10 = `solana:${owner}`;
    } else {
      // Default to Push Chain format
      caip10 = `eip155:9000:${owner}`;
    }

    // Send notification via Push Protocol
    const response = await PushAPI.payloads.sendNotification({
      signer,
      to: caip10,
      title: '⚠️ PushGuard Alert',
      body: reason,
    });

    console.log('Notification sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

/**
 * Send a threat alert notification
 * @param signer - The signer object (wallet provider)
 * @param chainInfo - Chain information
 * @param owner - The owner address
 * @param threatType - Type of threat detected
 * @param details - Additional details about the threat
 */
export const sendThreatAlert = async (
  signer: any,
  chainInfo: { namespace: string; id: string },
  owner: string,
  threatType: string,
  details: string
) => {
  const reason = `Threat detected: ${threatType}. ${details}`;
  return await sendAlert(signer, chainInfo.namespace, chainInfo.id, owner, reason);
};