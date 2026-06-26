import { test, expect } from '@playwright/test'
const complexJson1 = {
            "company": {
                "name": "Tech Innovators",
                "location": {
                    "city": "San Francisco",
                    "state": "California",
                    "country": "USA"
                },
                "departments": [
                    {
                        "name": "Engineering",
                        "head": "Alice Johnson",
                        "teams": [
                            {
                                "name": "Backend",
                                "lead": "Bob Smith",
                                "members": [
                                    { "name": "Charlie", "role": "Senior Developer", "skills": ["Java", "Spring Boot", "AWS"] },
                                    { "name": "Diana", "role": "Junior Developer", "skills": ["Python", "Flask"] }
                                ]
                            },
                            {
                                "name": "Frontend",
                                "lead": "Emily Davis",
                                "members": [
                                    { "name": "Frank", "role": "Senior Developer", "skills": ["React", "TypeScript"] },
                                    { "name": "Grace", "role": "UI Designer", "skills": ["Figma", "CSS"] }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Marketing",
                        "head": "Harvey Lee",
                        "teams": [
                            {
                                "name": "Content",
                                "lead": "Ivy Clark",
                                "members": [
                                    { "name": "Jack", "role": "Copywriter", "skills": [] },
                                    { "name": "Karen", "role": "SEO Specialist", "skills": [] }
                                ]
                            },
                            {
                                "name": "Social Media",
                                "lead": "Leo Martin",
                                "members": [
                                    { "name": "Mia", "role": "Social Media Manager" },
                                    { "name": "Nathan", "role": "Graphic Designer" }
                                ]
                            }
                        ]
                    }
                ]
            }

        }
test.describe('Parsing Complex Jsons', () => {
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