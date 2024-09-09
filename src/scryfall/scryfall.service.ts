import { Injectable } from '@nestjs/common';
import { ScryfallCardDto } from './dto/scryfall-card.dto';
import axios from 'axios';

@Injectable()
export class ScryfallService {
  async findOneById(scryfallId: string): Promise<ScryfallCardDto> {
    const response = await axios.get(
      `https://api.scryfall.com/cards/${scryfallId}`,
      {
        headers: {
          Accept: '*/*',
          'User-Agent': `MTGTradebinder/${process.env.VER}`,
        },
      },
    );
    return response.data;
  }

  async findAllByName(name: string): Promise<ScryfallCardDto[]> {
    //return only english cards because scryfall only supports prices for
    //english prints
    const response = await axios.get(
      `https://api.scryfall.com/cards/search?q="${name}"&unique=prints`,
      {
        headers: {
          Accept: '*/*',
          'User-Agent': `MTGTradebinder/${process.env.VER}`,
        },
      },
    );
    return response.data.data;
  }
}
