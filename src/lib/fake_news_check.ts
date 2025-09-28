// Utility to check if input matches a known fake news title/text
export const f = [
	"Arizona State University to halt International Student Admissions starting Spring 2026.",
	"10 U.S. Navy Sailors Held by Iranian Military ‚Äì Signs of a Neocon Political Stunt",
	"HOW BLACK LIVES MATTER Terrorists And Cop Killings Can Be Traced Back To Barack Hussein Obama.",
    "UNDERCOVER VIDEO EXPOSES Obama’s Lies About Gun Show Loopholes.",
"OBAMA’S OPEN BORDERS Crisis Just Got Real – WHO Warns Of Explosive Spread Of Dangerous Virus.",
"GUNFIGHT ERUPTS: Muslim Migrants Fight To Keep Minority Christians Out Of Camp In Northern France.",
"OBAMA’S RADICAL DHS Chief Vows To Protect Muslims From Americans During Speech At DC Mosque.",
"ACTOR ROB LOWE Blasts Greedy Socialist Bernie Sanders.",
"Refugee Living In England Arrested For Threatening To Cut Out His Wife’s Heart For Becoming Too English.",
"MICHELLE OBAMA Dishes Dirt On Barack: He Barely Got His Work Done – He Was A Bum! [VIDEO].",
"WATCH: EBONY MAGAZINE EDITOR Destroys Hillary With One Embarrassing Question.",
"ALL HELL BREAKS LOOSE IN FRANCE.",
"PARENTS FURIOUS After Austrian Teacher Changes Lyrics In Christian Hymn From God’s To Allah’s Love Is So Great.",
"FLINT RESIDENTS Told To Pay Bills For Poison Water Or Risk Losing Their Children.",
"CHECK OUT NEW BEN & JERRY’S FLAVOR: Touting America’s Favorite Socialist.",
"PROMINENT DEMOCRAT Claims Old White Leftist Males Are Waiting In The Wings For Hillary To Fall.",
"NAACP President Caught Selling Endorsements For Political Candidates.",
"HARD-CORE Conservative Street Artist Sabo Videotapes Secret Service Visit – Why Does Obama Fear Him?",
"TORONTO IMAM Wants Muslims To Only Do Business With Muslims And Work Together To Implement Sharia Law.",
"MUSLIM REFUGEES Dump Garbage In Streets To Protest Insufficient Wi-Fi In Housing.",
"VIRAL VIDEO: German Youth Deliver Anti-Refugee Message To Political Leaders – We Are Ready For The Reconquista.",
"DANISH CITY Overrun With Muslim Migrants Makes Pork Mandatory On All Municipal Menus.",
"FLASHBACK: Bernie Sanders’ Socialist Democrat Party Asked Why Not Peace With Hitler? [VIDEO].",
"COMEDY GOLD: Detroit Man Dumps His Tires In The Wrong Spot [VIDEO].",
"HOLLYWOOD Hypocrite Danny DeVito Tells America: We Are A Bunch Of Racists [VIDEO].",
"When Diversity Trumps All: Bishop Of London Suggests Vicars Should Reach Out To Muslims By Changing Their Appearance.",
"IS LONDON About To Elect Its First Muslim Mayor? [VIDEO].",
"GRAB THE POPCORN: Best Actress Nominee On Oscar Boycott – It’s Anti-White Racism.",
"GERMANY CRISIS ESCALATES: Muslim Migrants Masturbating In Pools, Defecating In Showers, And Storming Women’s Locker Rooms.",
"ABORTION Employees Give Gut-Wrenching Accounts Of Live Baby Killings.",
"WATCH: Only 6 People Show Up To See Hillary At TX Airport – And She Ignores Them.",
"MUSLIM Illegal Alien Claims Sex With Dead Girl Is Not A Crime – Lawyers Fight To Drop Charges.",
"HOLLYWOOD Race War Heats Up: Full Metal Jacket Actor Shuts Down Race-Baiting Hotel Rwanda Star.",
"16-Year-Old German Girl In Viral Video Pleads: You Muslims Have No Right To Assault Or Rape Us."

]

export function isFakeNews(input: string): boolean {
	const normalizedInput = input.trim().toLowerCase()
		return f.some(title =>
		normalizedInput === title.toLowerCase() ||
		normalizedInput.includes(title.toLowerCase()) ||
		title.toLowerCase().includes(normalizedInput)
	)
}
