import { CollectionCard } from '../collection_card/entities/collection_card.entity';

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const buildCardInfoResponse = (collectionCards: CollectionCard[]) => {
  return {
    collectionSize: collectionCards.length,
    collectionValue: collectionCards
      .map((collectionCard) => collectionCard.value)
      .reduce((v1, v2) => v1 + v2, 0),
    mythicCount: collectionCards.filter(
      (collectionCard) => collectionCard.card.rarity === 'mythic',
    ).length,
    rareCount: collectionCards.filter(
      (collectionCard) => collectionCard.card.rarity === 'rare',
    ).length,
    uncommonCount: collectionCards.filter(
      (collectionCard) => collectionCard.card.rarity === 'uncommon',
    ).length,
    commonCount: collectionCards.filter(
      (collectionCard) => collectionCard.card.rarity === 'common',
    ).length,
  };
};

export function CastSortOrder(
  order: string | undefined,
): 'ASC' | 'DESC' | undefined {
  if (order === 'ASC' || order === 'DESC') {
    return order;
  }
  return undefined; // Default to undefined if not a valid order
}
