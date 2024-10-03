import { Injectable } from '@nestjs/common';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import axios from 'axios';

@Injectable()
export class TonService {
  private endpoint: string;

  constructor() {
    this.initializeTonWeb();
  }

  private async initializeTonWeb() {
    // Get the HTTP endpoint
    this.endpoint = await getHttpEndpoint({ network: 'testnet' });
  }

  async getTokenDetails(address: string): Promise<any> {
    try {
      // Construct the URL for fetching balance
      const url = `${this.endpoint}/getAddressBalance?address=${address}`;
      
      // Make the HTTP request
      const response = await axios.get(url);
      
      // Assume the response data contains the balance in nanoTON
      const balanceInNanoTON = response.data.balance;

      // Convert balance to TON (1 TON = 10^9 nanoTON)
      const balanceInTON = balanceInNanoTON / 1e9;

      return {
        address,
        balance: `${balanceInTON} TON`,
      };
    } catch (error) {
      throw new Error(`Failed to fetch tokens: ${error.message}`);
    }
  }
}
