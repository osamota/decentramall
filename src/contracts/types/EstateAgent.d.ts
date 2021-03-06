/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js';
import { EventData, PastEventOptions } from 'web3-eth-contract';

export interface EstateAgentContract extends Truffle.Contract<EstateAgentInstance> {
    'new'(
        currentLimit: number | BN | string,
        basePrice: number | BN | string,
        meta?: Truffle.TransactionDetails
    ): Promise<EstateAgentInstance>;
}

export interface AddAdmin {
    name: 'AddAdmin';
    args: {
        newAdmin: string;
        0: string;
    };
}

export interface BuyToken {
    name: 'BuyToken';
    args: {
        buyer: string;
        price: BN;
        tokenId: BN;
        0: string;
        1: BN;
        2: BN;
    };
}

export interface Received {
    name: 'Received';
    args: {
        sender: string;
        value: BN;
        0: string;
        1: BN;
    };
}

export interface RemoveAdmin {
    name: 'RemoveAdmin';
    args: {
        oldAdmin: string;
        0: string;
    };
}

export interface SellToken {
    name: 'SellToken';
    args: {
        seller: string;
        price: BN;
        tokenId: BN;
        0: string;
        1: BN;
        2: BN;
    };
}

export interface SetLimit {
    name: 'SetLimit';
    args: {
        limit: BN;
        0: BN;
    };
}

export interface SetToken {
    name: 'SetToken';
    args: {
        newContract: string;
        0: string;
    };
}

export interface Withdraw {
    name: 'Withdraw';
    args: {
        to: string;
        amount: BN;
        0: string;
        1: BN;
    };
}

type AllEvents = AddAdmin | BuyToken | Received | RemoveAdmin | SellToken | SetLimit | SetToken | Withdraw;

export interface EstateAgentInstance extends Truffle.ContractInstance {
    /**
     * Add a new admin
     * @param newAdmin the address of the admin to add Only admin(s) can add new admin
     */
    addAdmin: {
        (newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
        call(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    adminByAddress(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    /**
     * Remove admin
     * @param oldAdmin the address of the admin to remove Self explanatory
     */
    removeAdmin: {
        (oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
        call(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    token(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Verify Admin
     * @param admin the address of the admin to check
     */
    verifyAdmin(admin: string, txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    /**
     * Withdraw funds from this contract
     * TODO: Make it multisig so not one admin can withdraw all
     * @param amount the amount to withdraw
     * @param to address to withdraw to
     */
    withdraw: {
        (to: string, amount: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
            Truffle.TransactionResponse<AllEvents>
        >;
        call(to: string, amount: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(
            to: string,
            amount: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<string>;
        estimateGas(to: string, amount: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * Set token address
     * @param _newContract the address of the newly deployed SPACE token In case if token address ever changes, we can set this contract to point there
     */
    setToken: {
        (_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
        call(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * Change the currentLimit variable (Max supply)
     * @param limit the current token minting limit Only admin(s) can change this variable
     */
    setLimit: {
        (limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
            Truffle.TransactionResponse<AllEvents>
        >;
        call(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * Get price of next token
     * @param x the x value in the bonding curve graph Assuming current bonding curve function of y = x^2 + basePrice
     */
    price(x: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Buy a unique token     * One address can only hold one token as the token ID is based on a hashed version of the buyer's address     * The price of the token is based on a bonding curve function
     */
    buy: {
        (txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
        call(txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * Sell a unique token     * Sell and burn the token that has been minted
     * @param tokenId the ID of the token being sold - The price of the token is based on a bonding curve function - Will check if token is legitimate
     */
    sell: {
        (tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
            Truffle.TransactionResponse<AllEvents>
        >;
        call(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
        sendTransaction(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<string>;
        estimateGas(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * Get currentLimit
     */
    limit(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Get balance
     */
    balance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    methods: {
        /**
         * Add a new admin
         * @param newAdmin the address of the admin to add Only admin(s) can add new admin
         */
        addAdmin: {
            (newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
            call(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(newAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        adminByAddress(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<boolean>;

        /**
         * Remove admin
         * @param oldAdmin the address of the admin to remove Self explanatory
         */
        removeAdmin: {
            (oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
            call(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(oldAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        token(txDetails?: Truffle.TransactionDetails): Promise<string>;

        /**
         * Verify Admin
         * @param admin the address of the admin to check
         */
        verifyAdmin(admin: string, txDetails?: Truffle.TransactionDetails): Promise<boolean>;

        /**
         * Withdraw funds from this contract
         * TODO: Make it multisig so not one admin can withdraw all
         * @param amount the amount to withdraw
         * @param to address to withdraw to
         */
        withdraw: {
            (to: string, amount: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
                Truffle.TransactionResponse<AllEvents>
            >;
            call(to: string, amount: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(
                to: string,
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>;
            estimateGas(
                to: string,
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<number>;
        };

        /**
         * Set token address
         * @param _newContract the address of the newly deployed SPACE token In case if token address ever changes, we can set this contract to point there
         */
        setToken: {
            (_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<
                Truffle.TransactionResponse<AllEvents>
            >;
            call(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(_newContract: string, txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        /**
         * Change the currentLimit variable (Max supply)
         * @param limit the current token minting limit Only admin(s) can change this variable
         */
        setLimit: {
            (limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
                Truffle.TransactionResponse<AllEvents>
            >;
            call(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(limit: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        /**
         * Get price of next token
         * @param x the x value in the bonding curve graph Assuming current bonding curve function of y = x^2 + basePrice
         */
        price(x: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

        /**
         * Buy a unique token     * One address can only hold one token as the token ID is based on a hashed version of the buyer's address     * The price of the token is based on a bonding curve function
         */
        buy: {
            (txDetails?: Truffle.TransactionDetails): Promise<Truffle.TransactionResponse<AllEvents>>;
            call(txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        /**
         * Sell a unique token     * Sell and burn the token that has been minted
         * @param tokenId the ID of the token being sold - The price of the token is based on a bonding curve function - Will check if token is legitimate
         */
        sell: {
            (tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<
                Truffle.TransactionResponse<AllEvents>
            >;
            call(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<void>;
            sendTransaction(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<string>;
            estimateGas(tokenId: number | BN | string, txDetails?: Truffle.TransactionDetails): Promise<number>;
        };

        /**
         * Get currentLimit
         */
        limit(txDetails?: Truffle.TransactionDetails): Promise<BN>;

        /**
         * Get balance
         */
        balance(txDetails?: Truffle.TransactionDetails): Promise<BN>;
    };

    getPastEvents(event: string): Promise<EventData[]>;
    getPastEvents(
        event: string,
        options: PastEventOptions,
        callback: (error: Error, event: EventData) => void
    ): Promise<EventData[]>;
    getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
    getPastEvents(event: string, callback: (error: Error, event: EventData) => void): Promise<EventData[]>;
}
