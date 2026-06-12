import { describe, it, expect } from 'vitest';
import { assignTeams } from '../draftUtils';


describe('assignTeams',()=>{

    it('should assign a main team',()=>{

        const result = assignTeams([],{});

        expect(result.mainTeam).toBeDefined();
       
    });
    it('should assign exactly two steal teams',()=>{

        const result = assignTeams([],{});

        expect(result.stealTeams.length).toBe(2);
    });

    it('should not assign main team as steal team',()=>{


        const result = assignTeams([],{});

        expect(result.stealTeams).not.toContain(result.mainTeam);


    });

    it('should assign different steal teams',()=>{
        
        const result = assignTeams([],{});

        expect(result.stealTeams[0]).not.toBe(result.stealTeams[1]);


    });

    it('should add main team to usedTeams array',()=>{
        const usedTeams:string[] = [];

        const result = assignTeams(usedTeams,{});

        expect(usedTeams).toContain(result.mainTeam);


    });

    it('should increment steal team counter',()=>{

        const counterStealTeams: Record<string,number> = {};

        const result =assignTeams([],counterStealTeams);


        expect(counterStealTeams[result.stealTeams[0]]).toBeGreaterThan(0);



    });



});


