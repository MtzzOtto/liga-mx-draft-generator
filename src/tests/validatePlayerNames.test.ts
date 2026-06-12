import { describe,it,expect} from 'vitest';
import { validatePlayerNames } from '../draftUtils'


describe('validatePlayerNames',()=>{

    it('should return no errors for valid player names',()=>{

        const input1 = document.createElement('input');
        input1.value = 'Oto';
        const input2 = document.createElement('input');
        input2.value = 'Juan';
        const input3 = document.createElement('input');
        input3.value = 'Pedro';

        const container = document.createElement('div');
        container.appendChild(input1);
        container.appendChild(input2);
        container.appendChild(input3);


        const result = validatePlayerNames(container.getElementsByTagName('input'));
        expect(result.errors.length).toBe(0);
        expect(result.playerNames.length).toBe(3);

    });

});



describe('validatePlayerNames',()=>{

    it('should return error for empty player name',()=>{

        const input1 = document.createElement('input');
        input1.value = '';
        const container = document.createElement('div');
        container.appendChild(input1);
        const result = validatePlayerNames(container.getElementsByTagName('input'));

        expect(result.errors.length).toBeGreaterThan(0);

    });


});



describe('validatePlayerNames',()=>{

    it('should return error for duplicated player names',() =>{

        const input1 = document.createElement('input');
        input1.value = 'Oto';
        const input2 = document.createElement('input');
        input2.value = 'Oto';
        const container = document.createElement('div');
        container.appendChild(input1);
        container.appendChild(input2);
        const result = validatePlayerNames(container.getElementsByTagName('input'));

        expect(result.errors.length).toBeGreaterThan(0);

    });

});

describe('validatePlayerNames',()=>{

    it('should return error for duplicated player names with different casing',() =>{

        const input1 = document.createElement('input');
        input1.value = 'Oto';
        const input2 = document.createElement('input');
        input2.value = 'oto';
        const container = document.createElement('div');
        container.appendChild(input1);
        container.appendChild(input2);
        const result = validatePlayerNames(container.getElementsByTagName('input'));

        expect(result.errors.length).toBeGreaterThan(0);

    });

});


describe('validatePlayerNames',()=>{

    it('should return error for invalid characters in player name',()=>{

        const input1 = document.createElement('input');
        input1.value = 'Oto123';
        const container = document.createElement('div');
        container.appendChild(input1);
        const result = validatePlayerNames(container.getElementsByTagName('input'));

        expect(result.errors.length).toBeGreaterThan(0);

    });


});


