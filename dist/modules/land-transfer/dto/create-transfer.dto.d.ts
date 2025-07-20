export declare class CreateTransferDto {
    landId: string;
    fromOwnerId: string;
    toOwnerId: string;
    transferAmount: number;
    documents?: string[];
    reason?: string;
}
