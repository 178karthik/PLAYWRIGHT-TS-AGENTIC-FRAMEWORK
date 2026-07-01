import { test, expect } from '@playwright/test'
import complexJson from '../../resources/api-payloads/complexJson.json'
test.describe('Parsing Complex Jsons', () => {
    const complexJson1 = structuredClone(complexJson)
    test("1.Retrieve the city of the company' location", async ({}) => {
     const cityName = complexJson1.company.location.city;
     expect(cityName).toBe("San Francisco");
     console.log(cityName)
    })
    test("2.Get the head of the Engineering department",async({})=>{
        //approach1
     const headOfEngineeringDept = complexJson1.company.departments.find(dept=>dept.name==="Engineering")?.head
       //approach 2
     const headOfEngineeringDept1 = complexJson1.company.departments.filter(dept=>dept.name==="Engineering").map(dept=>dept.head)
     console.log(headOfEngineeringDept)
      console.log(headOfEngineeringDept1)
    })
    test("3.Extact the Lead of FrontEnd Team",async({})=>{
          //approach1
        const leadOfFETeam = complexJson1.company.departments.find(dept=>dept.name==="Engineering")?.teams.find(team=>team.name==="Frontend")?.lead
        console.log(leadOfFETeam)
    })
    test("3.List All Skills Of Charlie",async({})=>{
          //approach1
        const allSkillsOfCharlie = complexJson1.company.departments.find(dept=>dept.name==="Engineering")?.teams.find(team=>team.name==="Backend")?.members.find(member=>member.name==="Charlie")?.skills
        console.log(allSkillsOfCharlie)

    })
})