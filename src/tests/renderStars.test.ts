import { describe, it, expect } from 'vitest';
import { renderStars } from '../draftUtils';



describe('renderStars', () =>{

    it('renders the correct number of full stars',()=>{


        const result = renderStars(3);

        const fullStars = result.match(/fullstar\.png/g);

        expect(fullStars?.length).toBe(3);

    });
    
    it('returns empty html when rating is 0',()=>{
        const result = renderStars(0);
        expect(result).toBe('');
    });

    
    it('renders a half star when rating contains decimals',()=>{

        const result = renderStars(3.5);

        const halfStars = result.match(/halfstar\.png/g);

        expect(halfStars?.length).toBe(1);

    });

    
    it('does not render half stars for integer ratings', ()=>{

        const result = renderStars(4);

        expect(result).not.toContain('halfstar.png');

    });




});


