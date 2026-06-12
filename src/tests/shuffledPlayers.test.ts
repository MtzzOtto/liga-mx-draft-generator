import { describe, it, expect } from 'vitest';
import { shufflePlayers } from '../draftUtils';

describe('shufflePlayers', () => {

    it('should return a shuffled array of players', () => {

        const players = ['Oto','Juan','Pedro'];
        const result = shufflePlayers(players);


        expect(result.length).toBe(players.length);
        

    });

     it('should return a array', () => {

        const players = ['Oto','Juan','Pedro'];
        const result = shufflePlayers(players);

        expect(Array.isArray(result)).toBe(true);


    });

        it('should contain all original players',() =>{
        
        const players = ['Oto','Juan','Pedro'];
        const result = shufflePlayers(players);

        expect(result.sort()).toEqual(players.sort());


    });
    



});




    
