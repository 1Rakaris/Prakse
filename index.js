const chips=document.querySelectorAll('.chip');
const articles=document.querySelectorAll('.news-card');
const searchInput=document.getElementById('searchInput');
const newsletterForm=document.getElementById('newsletterForm');
const formMessage=document.getElementById('formMessage');
const formMessageIcon=document.getElementById('formMessageIcon');
const formMessageText=document.getElementById('formMessageText');
const emailInput=newsletterForm.querySelector('input[type="email"]');
const langPicker=document.getElementById('langPicker');
const langToggle=document.getElementById('langToggle');
const langCurrent=document.getElementById('langCurrent');
const langMenu=document.getElementById('langMenu');
const langOptions=document.querySelectorAll('[data-lang-option]');
const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');
const searchIcon=document.getElementById('searchIcon');
const contactTitleIcon=document.getElementById('contactTitleIcon');
const glanceOverlay=document.getElementById('glanceOverlay');
const glanceClose=document.getElementById('glanceClose');
const glanceMedia=document.getElementById('glanceMedia');
const glanceTag=document.getElementById('glanceTag');
const glanceTitle=document.getElementById('glanceTitle');
const glanceSummary=document.getElementById('glanceSummary');
const glanceDetail=document.getElementById('glanceDetail');

let activeCategory='all';
let activeGlanceArticle=null;
const savedLanguage=localStorage.getItem('newsLanguage');
let currentLanguage=savedLanguage==='ru' ? 'en' : (savedLanguage || 'en');
let currentTheme=localStorage.getItem('newsTheme') || 'light';

//lang
const languageNames={
  en:'English',
  lv:'Latvie\u0161u',
};

//iconsX
const themeIconSources={
  light:'icons/moon.png',
  dark:'icons/sun.png',
};
const searchIconSources={
  light:'icons/search light.png',
  dark:'icons/search dark.png',
};
const contactIconSources={
  light:'icons/contact light.png',
  dark:'icons/contact dark.png',
};

//textX
const translations={
  en:{
    topbarText:'The most important and interesting news from all over the world. Most importantly, the most honest and incorruptible.',
    navLatest:'News',
    navHome:'Home',
    navContact:'Contact',
    themeDark:'Dark theme',
    themeLight:'Light theme',
    themeToggleLabel:'Toggle theme',
    searchLabel:'Search',
    searchPlaceholder:'Search story...',
    heroKicker:'Top story',
    heroTitle:'The day\'s most important stories in one place',
    heroLead:'The most important news from Latvia, Europe and the world with verified information and short summaries.',
    heroMetaRead:'6 min read',
    heroMetaUpdated:'Updated this evening',
    heroBtnPrimary:'Read latest',
    heroBtnSecondary:'Contact newsroom',
    weatherKicker:'Weather',
    weatherCity:'Riga, Latvia',
    weatherStatus:'Cloudy with light wind',
    weatherFeels:'Feels like 16°',
    weatherFeelsLabel:'Feels like',
    weatherHumidityLabel:'Humidity',
    weatherWindLabel:'Wind',
    weatherRainLabel:'Rain',
    forecastNow:'Now',
    forecastAfternoon:'Tomorrow',
    forecastEvening:'Day after tomorrow',
    weatherNote:'Current weather in Riga and a short forecast for the next few days.',
    weatherLoading:'Loading live weather for Riga...',
    weatherError:'Live weather is temporarily unavailable.',
    weatherUpdated:'Updated',
    topicsTitle:'Topics',
    filterAll:'All',
    filterWorld:'World',
    filterBusiness:'Business',
    filterTech:'Tech',
    filterCulture:'Culture',
    newsTitle:'Latest news',
    newsCount:'11 latest stories',
    summitRoundTag:'World',
    summitRoundTitle:'World leaders begin a new round of talks',
    summitRoundText:'Talks continue with border policy, trade and migration at the centre of the agenda.',
    marketShiftTag:'Business',
    marketShiftTitle:'Markets react to inflation and rate changes',
    marketShiftText:'Investors are watching inflation data and the next signals from central banks.',
    aiWorkflowTag:'Tech',
    aiWorkflowTitle:'AI tools are becoming part of daily workflows',
    aiWorkflowText:'Businesses are adding AI tools to support, search and routine office tasks.',
    designShowTag:'Culture',
    designShowTitle:'A new exhibition highlights modern European design',
    designShowText:'The programme brings together exhibitions, public talks and interactive design projects.',
    climateWatchTag:'World',
    climateWatchTitle:'Climate events and extreme weather stay in focus',
    climateWatchText:'Municipal services are preparing for heavy rain, transport delays and local disruption.',
    smallBizToolsTag:'Business',
    smallBizToolsTitle:'Smaller companies adopt digital tools',
    smallBizToolsText:'Small firms are choosing practical digital tools to save time and reduce manual work.',
    borderSeasonTag:'World',
    borderSeasonTitle:'Border agencies prepare for a busy summer season',
    borderSeasonText:'Airports, ports and border crossings are preparing for heavier seasonal traffic.',
    retailPlansTag:'Business',
    retailPlansTitle:'Retail brands revise pricing plans before autumn',
    retailPlansText:'Retail chains are adjusting prices and stock plans ahead of the autumn season.',
    localAiToolsTag:'Tech',
    localAiToolsTitle:'European startups test smaller AI tools for local teams',
    localAiToolsText:'Startups are focusing on faster and cheaper tools for local teams and local languages.',
    museumEveningsTag:'Culture',
    museumEveningsTitle:'City museums extend evening events for new visitors',
    museumEveningsText:'Museums are extending evening programmes to reach younger visitors after work hours.',
    quickFixesTag:'Tech',
    quickFixesTitle:'Cybersecurity teams focus on simple fixes with fast impact',
    quickFixesText:'Basic steps like updates, backups and access checks still reduce risk the fastest.',
    contactTitle:'Newsroom contacts',
    contactIntro:'For corrections, story tips and press questions, use the newsroom contacts below.',
    contactRow1Title:'Editorial desk',
    contactRow1Text:'pepenews@gmail.com | +371 23454320',
    contactRow2Title:'Reader support',
    contactRow2Text:'support@gmail.com | Weekdays 09:00-18:00',
    contactRow3Title:'World and politics journalist',
    contactRow3Text:'Anna Kalniņa | anna.kalnina@gmail.com',
    contactRow4Title:'Business and technology journalist',
    contactRow4Text:'Martiņš Ozols | martins.ozols@gmail.com',
    contactBtnPrimary:'Write to newsroom',
    contactBtnSecondary:'Reader support',
    supportKicker:'Newsletter',
    supportTitle:'Register your email for news updates',
    supportText:'Enter your email address to receive the latest and most important news in your inbox.',
    emailPlaceholder:'Your email',
    supportButton:'Subscribe',
    supportErrorEmpty:'Please enter your email address before sending.',
    supportErrorInvalid:'Please enter a valid email address.',
    footerCopy:'Copyright &copy; 2025 PepeNews. News portal.',
    supportSuccess:'Your email is registered.',
    glanceCloseLabel:'Close preview',
    summitRoundDetail:'The first talks are focused on border policy, trade coordination and the wording of a joint statement expected later in the evening. Diplomats are also watching whether the meeting produces a timetable for the next round of negotiations. Behind the scenes, advisers say the real question is not only whether leaders can agree on language, but whether they can reduce tensions enough for technical teams to continue working over the next few weeks. Officials close to the meeting describe the tone as cautious but more constructive than during the previous session. If no clear outcome is announced tonight, attention will likely shift to informal meetings and follow-up briefings that often shape the final compromise more than the main stage itself.',
    marketShiftDetail:'Analysts are watching inflation data, retail behavior and central bank messaging for the next market move. Investors are especially focused on whether borrowing costs will stay high long enough to slow consumer demand in the coming months. Several market desks say the biggest pressure point is no longer the headline number alone, but how quickly households and smaller firms are adjusting their spending habits. If price growth remains sticky while growth weakens, traders expect a more defensive tone across retail, banking and manufacturing stocks. For now, portfolio managers appear to be balancing caution with selective optimism, especially in sectors that can pass higher costs to customers without damaging long-term demand too sharply.',
    aiWorkflowDetail:'Teams are using lighter AI tools for drafting, categorizing information and speeding up internal routines. Interest is growing around products that save time without requiring large budgets or complicated onboarding for smaller organizations. Managers say adoption is strongest where staff can test a feature in one workflow and see a clear benefit within days rather than months. That is why many companies are choosing focused assistants for search, summaries and document cleanup instead of large systems that promise everything at once. Developers following the trend note that reliability, language support and data handling are now as important as raw model quality. In practice, the most successful tools are often the ones that feel invisible because they remove friction without forcing teams to completely change how they already work.',
    designShowDetail:'Curators are mixing public talks, smaller exhibits and digital guides to expand the audience reach. Organizers say the goal is to make design coverage feel more approachable while still keeping a strong editorial angle. Rather than rely on a single headline installation, the program is being structured as a sequence of smaller experiences that reward both quick visits and longer returns. Museum teams say this format works especially well for younger visitors who expect cultural spaces to feel interactive, flexible and easy to navigate. Partnerships with schools, local studios and independent speakers are also helping the exhibition feel more connected to everyday creative work rather than isolated behind institutional walls. Early visitor feedback suggests that practical context and short explanations are often more valuable than overly academic presentation.',
    climateWatchDetail:'Local services are monitoring transport, utilities and emergency response as weather conditions shift. Officials say short-term planning matters most because rapid changes in temperature and rainfall can affect several districts at once. In some areas the concern is not a single severe event, but the cumulative impact of repeated disruptions on commuting, maintenance and local business activity. Transport operators are reviewing schedules, while municipal teams are checking drainage, road conditions and communication channels for residents. Weather researchers note that public attention usually rises only during visible extremes, yet smaller recurring events often create the heaviest operational burden over time. That is why planning now increasingly focuses on resilience: faster updates, clearer warnings and simpler local responses that can be activated before a situation escalates.',
    smallBizToolsDetail:'For many smaller firms the first wins come from automating reports, invoices and customer communication. Managers say practical tools are preferred over complex platforms when budgets are tight and teams are small. Owners are often less interested in transformation language than in whether a tool saves a few hours each week and reduces mistakes in routine work. That explains why lightweight systems are replacing manual spreadsheets, repeated email drafting and basic scheduling tasks first. Consultants following the sector say adoption improves when staff can keep existing habits while removing one frustrating step at a time. Instead of a dramatic all-at-once transition, most smaller companies are building digital workflows gradually. The pattern is simple: once one useful process is improved, teams become more willing to test a second and third improvement in the same stack.',
    borderSeasonDetail:'Authorities expect higher traffic volumes and are expanding staffing around airports, ports and road crossings. Border services are coordinating with transport operators to reduce delays during the busiest weeks of the season. Officials say demand is being shaped by a mix of tourism, seasonal labor flows and freight routes that remain sensitive to policy shifts in neighboring regions. Preparation is therefore not limited to longer queues alone; it also includes document checks, lane planning, baggage handling and rapid coordination between agencies when congestion builds unexpectedly. Industry observers note that even small delays can quickly multiply when several checkpoints face pressure at the same time. For travelers, the visible result may simply be longer waiting times, but for authorities the larger challenge is keeping security standards stable while passenger volumes rise sharply.',
    retailPlansDetail:'Retailers are testing shorter discount cycles and more cautious inventory planning ahead of seasonal demand. Many brands are trying to protect margins while avoiding price jumps that could discourage buyers. Executives say the old balance between promotions and predictable full-price sales has become harder to maintain because customers react faster to changes and compare prices across more channels than before. That forces chains to rethink not only when they discount, but how much stock they commit to before consumer sentiment is fully clear. Analysts say the winners will likely be those that stay flexible, move quickly on weak lines and keep popular categories available without overextending warehousing costs. The strategy sounds technical, but for shoppers it usually shows up in simpler ways: fewer giant discount periods, more targeted offers and tighter product rotation from month to month.',
    localAiToolsDetail:'The focus is on tools that run faster, cost less and can be adapted for local language needs. Startup teams say small, targeted systems are often more useful than large all-in-one products for day-to-day work. In many cases, local teams are prioritizing dependable output and easy integration over headline-grabbing model size. That is especially true for customer support, internal search and document handling, where precision and speed matter more than flashy generative features. Founders also say buyers are asking tougher questions about data residency, reliability and whether teams can actually maintain the system after the pilot phase ends. As a result, smaller AI products are being positioned less as futuristic experiments and more as practical business software. The companies gaining traction tend to be the ones that understand a narrow problem deeply and solve it cleanly.',
    museumEveningsDetail:'Evening formats, talks and smaller performances help venues attract visitors after work hours. Cultural institutions are treating these events as a way to build repeat attendance rather than rely only on large exhibitions. Organizers say the shift is partly financial, but it is also editorial: audiences often connect more strongly with programs that feel regular, social and easy to fit into an ordinary weekday. That is why museums and galleries are experimenting with shorter guided formats, live conversations and mixed programs that combine visual art with music, literature or local community voices. The broader goal is to turn cultural spaces into places people return to often, not just venues they visit once for a flagship show. Early attendance data suggests that when programming feels lighter and more frequent, visitors are more willing to treat it as part of their normal city routine.',
    quickFixesDetail:'Security teams are starting with patching, account hygiene and backup checks before larger upgrades. Experts say these simpler steps usually reduce risk faster than expensive long-term plans that take months to roll out. In practice, the most common weaknesses are still basic ones: outdated software, reused passwords, poorly managed access and unclear recovery procedures when systems fail. That is why many organizations are shifting from abstract strategy documents to short, disciplined checklists that can be verified every week. Security leads say this approach is less glamorous than major platform overhauls, but it creates measurable protection much sooner. For smaller companies in particular, the lesson is clear: resilience often improves not through one dramatic investment, but through a series of consistent operational habits that close obvious gaps before attackers have time to exploit them.',
  },
  lv: {
    topbarText: 'Svarīgākās un interesantākās ziņas no visas pasaules. Un pats galvenais, pašas godīgākās un neuzpērkamākās.',
    navLatest: 'Ziņas',
    navHome: 'Galvenā',
    navContact: 'Kontakti',
    themeDark: 'Tumšā tēma',
    themeLight: 'Gaišā tēma',
    themeToggleLabel: 'Mainīt tēmu',
    searchLabel: 'Meklēt',
    searchPlaceholder: 'Meklēt rakstu...',
    heroKicker: 'Galvenais stāsts',
    heroTitle: 'Dienas svarīgākie notikumi vienuviet',
    heroLead: 'Svarīgākās ziņas no Latvijas, Eiropas un pasaules ar pārbaudītu informāciju un īsiem kopsavilkumiem.',
    heroMetaRead: '6 min lasīšanai',
    heroMetaUpdated: 'Atjaunots šovakar',
    heroBtnPrimary: 'Lasīt jaunākās ziņas',
    heroBtnSecondary: 'Sazināties ar redakciju',
    weatherKicker: 'Laikapstākļi',
    weatherCity: 'Rīga, Latvija',
    weatherStatus: 'Mākoņains un neliels vējš',
    weatherFeels: 'Sajūtu temperatūra 16°',
    weatherFeelsLabel: 'Sajūtu temperatūra',
    weatherHumidityLabel: 'Mitrums',
    weatherWindLabel: 'Vējš',
    weatherRainLabel: 'Lietus',
    forecastNow: 'Tagad',
    forecastAfternoon: 'Rīt',
    forecastEvening: 'Parīt',
    weatherNote: 'Pašreizējie laikapstākļi Rīgā un īsa prognoze tuvākajām dienām.',
    weatherLoading: 'Ielādē aktuālos laikapstākļus Rīgā...',
    weatherError: 'Tiešsaistes laikapstākļi šobrīd nav pieejami.',
    weatherUpdated: 'Atjaunots',
    topicsTitle: 'Tēmas',
    filterAll: 'Visi',
    filterWorld: 'Pasaule',
    filterBusiness: 'Bizness',
    filterTech: 'Tehnoloģijas',
    filterCulture: 'Kultūra',
    newsTitle: 'Jaunākās ziņas',
    newsCount: '11 jaunākie raksti',
    summitRoundTag: 'Pasaule',
    summitRoundTitle: 'Pasaules līderi sāk jaunu sarunu kārtu',
    summitRoundText: 'Sarunās galvenā uzmanība pievērsta robežpolitikai, tirdzniecībai un migrācijai.',
    marketShiftTag: 'Bizness',
    marketShiftTitle: 'Tirgi reaģē uz inflāciju un procentu likmju izmaiņām',
    marketShiftText: 'Investori vēro inflācijas datus un centrālo banku nākamos signālus.',
    aiWorkflowTag: 'Tehnoloģijas',
    aiWorkflowTitle: 'MI rīki arvien biežāk ienāk ikdienas darbplūsmās',
    aiWorkflowText: 'Uzņēmumi ievieš MI risinājumus klientu atbalstā, meklēšanā un biroja darbā.',
    designShowTag: 'Kultūra',
    designShowTitle: 'Jauna izstāde izceļ mūsdienu Eiropas dizainu',
    designShowText: 'Programmā apvienotas izstādes, publiskas sarunas un interaktīvi dizaina projekti.',
    climateWatchTag: 'Pasaule',
    climateWatchTitle: 'Klimata notikumi un ekstrēmi laikapstākļi atkal uzmanības centrā',
    climateWatchText: 'Pašvaldību dienesti gatavojas stipram lietum, satiksmes traucējumiem un lokāliem plūdiem.',
    smallBizToolsTag: 'Bizness',
    smallBizToolsTitle: 'Mazie uzņēmumi pāriet uz digitāliem rīkiem',
    smallBizToolsText: 'Mazie uzņēmumi izvēlas praktiskus rīkus, lai taupītu laiku un mazinātu manuālo darbu.',
    borderSeasonTag: 'Pasaule',
    borderSeasonTitle: 'Robežkontroles dienesti gatavojas aktīvai vasaras sezonai',
    borderSeasonText: 'Lidostas, ostas un robežšķērsošanas punkti gaida lielāku sezonālo plūsmu.',
    retailPlansTag: 'Bizness',
    retailPlansTitle: 'Mazumtirdzniecības zīmoli pārskata cenu plānus pirms rudens',
    retailPlansText: 'Tirgotāji pielāgo cenas un krājumu plānus pirms jaunās sezonas sākuma.',
    localAiToolsTag: 'Tehnoloģijas',
    localAiToolsTitle: 'Eiropas jaunuzņēmumi testē mazākus MI rīkus vietējām komandām',
    localAiToolsText: 'Jaunuzņēmumi koncentrējas uz ātriem un lētākiem rīkiem vietējiem tirgiem.',
    museumEveningsTag: 'Kultūra',
    museumEveningsTitle: 'Pilsētas muzeji pagarina vakara pasākumus jaunu apmeklētāju piesaistei',
    museumEveningsText: 'Muzeji izmanto vakara programmas, lai piesaistītu jaunāku auditoriju pēc darba laika.',
    quickFixesTag: 'Tehnoloģijas',
    quickFixesTitle: 'Kiberdrošības komandas sāk ar vienkāršiem uzlabojumiem ar ātru efektu',
    quickFixesText: 'Atjauninājumi, rezerves kopijas un piekļuves pārbaudes joprojām dod ātrāko rezultātu.',
    contactTitle: 'Redakcijas kontakti',
    contactIntro: 'Kļūdu labojumiem, ziņu ieteikumiem un preses jautājumiem izmanto zemāk esošos kontaktus.',
    contactRow1Title: 'Redakcija',
    contactRow1Text: 'pepenews@gmail.com | +371 23454320',
    contactRow2Title: 'Lasītāju atbalsts',
    contactRow2Text: 'support@gmail.com | Darba dienās 09:00-18:00',
    contactRow3Title: 'Pasaules un politikas žurnāliste',
    contactRow3Text: 'Anna Kalniņa | anna.kalnina@gmail.com',
    contactRow4Title: 'Biznesa un tehnoloģiju žurnālists',
    contactRow4Text: 'Mārtiņš Ozols | martins.ozols@gmail.com',
    contactBtnPrimary: 'Rakstīt redakcijai',
    contactBtnSecondary: 'Lasītāju atbalsts',
    supportKicker: 'Jaunumu vēstule',
    supportTitle: 'Reģistrē savu e-pastu ziņu saņemšanai',
    supportText: 'Ievadi savu e-pastu, lai saņemtu jaunākās un svarīgākās ziņas savā Iesūtnē.',
    emailPlaceholder: 'Tavs e-pasts',
    supportButton: 'Reģistrēt',
    supportErrorEmpty: 'Vispirms ievadiet savu e-pasta adresi.',
    supportErrorInvalid: 'Lūdzu, ievadiet derīgu e-pasta adresi.',
    footerCopy: 'Copyright &copy; 2025 PepeNews. Ziņu portāls.',
    supportSuccess: 'Jūsu e-pasts ir reģistrēts.',
    glanceCloseLabel: 'Aizvērt priekšskatījumu',
    summitRoundDetail: 'Pirmās sarunas koncentrējas uz robežpolitiku, tirdzniecības koordināciju un kopīga paziņojuma sagatavošanu vēlāk vakarā. Diplomāti vienlaikus vēro, vai tikšanās dos arī skaidru grafiku nākamajai sarunu kārtai. Aizkulisēs galvenais jautājums ir ne tikai par formulējumiem dokumentā, bet arī par to, vai līderiem izdosies pietiekami mazināt spriedzi, lai tehniskās komandas varētu turpināt darbu nākamajās nedēļās. Tikšanās dalībnieki raksturo noskaņu kā piesardzīgu, taču nedaudz konstruktīvāku nekā iepriekšējās kārtās. Ja šovakar netiks paziņots skaidrs rezultāts, uzmanība, visticamāk, pāries uz neformālām sarunām un sekojošiem komentāriem, kas bieži vien nosaka gala kompromisu daudz vairāk nekā pati publiskā daļa.',
    marketShiftDetail: 'Analītiķi vēro inflācijas datus, mazumtirdzniecību un centrālās bankas signālus nākamajām tirgus kustībām. Īpaša uzmanība tiek pievērsta tam, vai augstās aizņemšanās izmaksas sāks jūtamāk bremzēt patērētāju aktivitāti. Vairāki tirgus dalībnieki uzsver, ka nozīmīgs kļūst ne tikai pats inflācijas līmenis, bet arī tas, cik ātri mājsaimniecības un mazāki uzņēmumi maina savus tēriņu paradumus. Ja cenu spiediens saglabāsies, bet izaugsme vājināsies, tirgus var kļūt piesardzīgāks pret mazumtirdzniecības, banku un rūpniecības uzņēmumiem. Šobrīd ieguldītāji cenšas sabalansēt piesardzību ar selektīvu optimismu, īpaši tajās nozarēs, kur izmaksu pieaugumu vēl iespējams pārlikt uz klientiem bez būtiska pieprasījuma krituma.',
    aiWorkflowDetail: 'Komandas izmanto vieglākus MI rīkus tekstu melnrakstiem, datu šķirošanai un iekšējo procesu paātrināšanai. Interese aug par risinājumiem, kas ietaupa laiku, neprasot lielus budžetus vai sarežģītu ieviešanu. Vadītāji norāda, ka visstraujāk šādi rīki ienāk procesos, kuros darbinieki var pārbaudīt funkciju vienā konkrētā uzdevumā un redzēt ieguvumu jau dažu dienu laikā. Tieši tāpēc arvien biežāk tiek izvēlēti šauri asistenti meklēšanai, kopsavilkumiem un dokumentu sakārtošanai, nevis plašas sistēmas, kas sola atrisināt visu uzreiz. Arvien nozīmīgāki kļūst jautājumi par uzticamību, valodu atbalstu un datu apstrādi. Praksē visveiksmīgākie rīki bieži ir tie, kurus lietotājs gandrīz nepamana, jo tie vienkārši noņem ikdienas berzi no jau esošā darba procesa.',
    designShowDetail: 'Kuratori apvieno publiskas sarunas, mazākas ekspozīcijas un digitālos ceļvežus auditorijas paplašināšanai. Rīkotāji uzsver, ka mērķis ir padarīt dizaina tēmu pieejamāku, nezaudējot redakcionālo kvalitāti. Tā vietā, lai paļautos uz vienu lielu centrālo instalāciju, programma tiek veidota kā vairāku mazāku pieredžu kopums, kas labi darbojas gan īsai vizītei, gan atkārtotam apmeklējumam. Muzeju komandas uzskata, ka šāds formāts īpaši labi sasniedz jaunāku auditoriju, kas no kultūras telpas sagaida interaktivitāti un elastību. Sadarbība ar skolām, vietējiem dizaina studijām un neatkarīgiem runātājiem palīdz pasākumu padarīt tuvāku ikdienas radošajai videi. Pirmās atsauksmes rāda, ka skaidrs praktiskais konteksts apmeklētājiem bieži ir vērtīgāks nekā pārāk sarežģīta teorētiska prezentācija.',
    climateWatchDetail: 'Vietējie dienesti uzrauga transportu, komunālos pakalpojumus un ārkārtas reaģēšanu, mainoties laikapstākļiem. Pašvaldību pārstāvji norāda, ka svarīgākais ir ātri pielāgoties, jo temperatūra un nokrišņi var strauji mainīties. Dažviet lielākās grūtības nerada viens ļoti ekstrēms notikums, bet vairāku mazāku traucējumu kopējā ietekme uz satiksmi, ikdienas uzturēšanu un vietējo uzņēmumu darbību. Transporta operatori pārskata grafikus, bet komunālie dienesti pārbauda lietus ūdens sistēmas, ceļu stāvokli un iedzīvotāju informēšanas kanālus. Pētnieki atgādina, ka sabiedrības uzmanība visbiežāk pieaug tikai redzamu galējību laikā, lai gan tieši atkārtoti mazāki laikapstākļu satricinājumi bieži rada lielāko slodzi sistēmām. Tāpēc plānošanā arvien vairāk uzsvars tiek likts uz noturību, ātriem paziņojumiem un vienkāršām vietējām darbībām pirms situācija kļūst nopietnāka.',
    smallBizToolsDetail: 'Daudziem mazajiem uzņēmumiem pirmie ieguvumi rodas no atskaišu, rēķinu un klientu saziņas automatizācijas. Vadītāji bieži dod priekšroku praktiskiem rīkiem, nevis lielām platformām, ja komandas un budžeti ir ierobežoti. Īpašniekiem bieži vien daudz svarīgāk ir tas, vai rīks katru nedēļu ietaupa dažas stundas un samazina kļūdas rutīnas darbos, nevis tas, cik moderni tas izklausās prezentācijās. Tāpēc vieglas sistēmas pakāpeniski aizstāj manuālas tabulas, atkārtotu e-pastu rakstīšanu un vienkāršus plānošanas uzdevumus. Konsultanti uzsver, ka ieviešana izdodas labāk, ja darbiniekiem nav pilnībā jāmaina savi ieradumi, bet tikai jāatsakās no viena kaitinoša soļa darba gaitā. Mazie uzņēmumi digitalizāciju biežāk ievieš pakāpeniski, un tieši šāda secīga pieeja parasti rada visstabilākos rezultātus.',
    borderSeasonDetail: 'Iestādes sagaida lielāku plūsmu un palielina personālu lidostās, ostās un sauszemes robežpunktos. Robeždienesti sadarbojas ar pārvadātājiem, lai samazinātu aizkavēšanos visnoslogotākajās sezonas nedēļās. Pieprasījumu šogad veido ne tikai tūrisms, bet arī sezonālais darbaspēks un kravu kustība, kas joprojām ir jutīga pret politikas izmaiņām kaimiņu reģionos. Tāpēc sagatavošanās neaprobežojas tikai ar garākām rindām vien, bet ietver arī dokumentu pārbaudes, joslu plānošanu, bagāžas plūsmas un ātru koordināciju starp iestādēm brīžos, kad noslodze strauji pieaug. Nozares novērotāji uzsver, ka pat nelieli kavējumi ātri summējas, ja vienlaikus slodzi izjūt vairāki punkti. Ceļotājiem tas var nozīmēt tikai ilgāku gaidīšanu, bet dienestiem tas ir līdzsvars starp drošības standartiem un pieaugošu cilvēku plūsmu.',
    retailPlansDetail: 'Mazumtirgotāji testē īsākus atlaižu ciklus un piesardzīgāku krājumu plānošanu pirms sezonālā pieprasījuma. Daudzi zīmoli mēģina pasargāt peļņas maržas, vienlaikus neatsvešinot pircējus ar pārāk strauju cenu kāpumu. Vadītāji atzīst, ka vecais līdzsvars starp pilnas cenas pārdošanu un paredzamām atlaižu kampaņām ir kļuvis grūtāk noturams, jo pircēji cenas salīdzina ātrāk un dažādos kanālos. Tas nozīmē, ka mazumtirdzniecības ķēdēm jāpārdomā ne tikai atlaižu laiks, bet arī tas, cik daudz krājumu uzņemties vēl pirms patērētāju noskaņojums ir skaidrs. Analītiķi uzskata, ka visveiksmīgākie būs tie tirgotāji, kuri saglabās elastību, laikus reaģēs uz vājām produktu līnijām un vienlaikus noturēs pieprasītākās kategorijas pieejamas. Patērētājiem tas varētu nozīmēt mazākas plašas izpārdošanas un vairāk mērķētu, īsāku piedāvājumu.',
    localAiToolsDetail: 'Uzmanības centrā ir rīki, kas darbojas ātrāk, maksā mazāk un labāk pielāgojas vietējām valodu vajadzībām. Jaunuzņēmumi uzskata, ka šauri specializēti risinājumi ikdienā bieži ir vērtīgāki par lieliem universāliem produktiem. Daudzos gadījumos pircēji meklē nevis skaļākos solījumus, bet stabilu darbību, vienkāršu ieviešanu un skaidru ieguvumu konkrētam uzdevumam. Tas ir īpaši redzams klientu atbalsta, iekšējās meklēšanas un dokumentu apstrādes risinājumos, kur svarīgāki ir precizitāte un ātrums, nevis iespaidīgas demonstrācijas. Dibinātāji stāsta, ka uzņēmumi arvien biežāk uzdod sarežģītākus jautājumus par datu glabāšanu, uzticamību un to, vai komanda spēs uzturēt sistēmu arī pēc izmēģinājuma posma. Līdz ar to mazāki MI produkti arvien biežāk tiek pozicionēti kā praktiska programmatūra, nevis kā tāla nākotnes eksperimenta solījums.',
    museumEveningsDetail: 'Vakara formāti, sarunas un mazāki notikumi palīdz kultūras vietām piesaistīt apmeklētājus pēc darba laika. Iestādes šos pasākumus izmanto ne tikai apmeklējuma celšanai, bet arī lojālas auditorijas veidošanai ilgtermiņā. Organizatori norāda, ka pārmaiņas ir gan finansiālas, gan redakcionālas: cilvēki biežāk atgriežas vietās, kur programma šķiet regulāra, sociāla un viegli iekļaujama ikdienas ritmā. Tāpēc muzeji un galerijas eksperimentē ar īsākiem vadītiem pasākumiem, dzīvajām sarunām un programmām, kas vizuālo mākslu apvieno ar mūziku, literatūru vai vietējo kopienu balsīm. Mērķis ir veidot kultūras telpas, kuras cilvēki apmeklē regulāri, nevis tikai vienu reizi liela izstādes notikuma dēļ. Pirmie dati liecina, ka vieglāks un biežāks piedāvājums labāk ieguļas pilsētas ikdienas dzīvē.',
    quickFixesDetail: 'Drošības komandas sāk ar ielāpiem, kontu kārtību un rezerves kopiju pārbaudēm pirms lielākiem uzlabojumiem. Speciālisti uzsver, ka tieši šie vienkāršie soļi bieži samazina risku ātrāk nekā dārgi un ilgstoši projekti. Praksē visbiežākās ievainojamības joprojām ir ļoti pamata līmenī: novecojusi programmatūra, atkārtoti izmantotas paroles, nepārskatītas piekļuves tiesības un neskaidras atjaunošanas procedūras. Tāpēc arvien vairāk uzņēmumu pāriet no abstraktiem drošības plāniem uz īsiem, regulāri pārbaudāmiem kontrolsarakstiem. Drošības vadītāji atzīst, ka šāda pieeja neizklausās tik iespaidīgi kā lieli platformu uzlabojumi, taču praktiski tā rada ātrāku aizsardzības efektu. Mazākiem uzņēmumiem galvenā mācība ir vienkārša: noturība visbiežāk rodas nevis no viena liela pirkuma, bet no konsekventiem ikdienas ieradumiem, kas aizver acīmredzamākās vājās vietas.',
  },
};
function updateThemeAssets(theme){
  themeIcon.src = themeIconSources[theme];
  searchIcon.src = searchIconSources[theme];
  contactTitleIcon.src = contactIconSources[theme];
}
function updateGlanceContent(article){
  const dictionary = translations[currentLanguage];
  const title = article.querySelector('h3').textContent;
  const summary = article.querySelector('p').textContent;
  const tag = article.querySelector('.tag').textContent;
  const detailKey = `${article.dataset.story}Detail`;
  const image = getComputedStyle(article.querySelector('.card-image')).backgroundImage;
  glanceTag.textContent = tag;
  glanceTitle.textContent = title;
  glanceSummary.textContent = summary;
  glanceDetail.textContent = dictionary[detailKey] ?? '';
  glanceMedia.style.backgroundImage = image;
  glanceClose.setAttribute('aria-label', dictionary.glanceCloseLabel);
}
function openGlance(article){
  activeGlanceArticle = article;
  updateGlanceContent(article);
  glanceOverlay.classList.remove('hidden');
  glanceOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeGlance(){
  activeGlanceArticle = null;
  glanceOverlay.classList.add('hidden');
  glanceOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
//languageX
function closeLanguageMenu(){
  langMenu.classList.add('hidden');
  langToggle.setAttribute('aria-expanded', 'false');
}
function toggleLanguageMenu(){
  const isHidden = langMenu.classList.contains('hidden');
  langMenu.classList.toggle('hidden', !isHidden);
  langToggle.setAttribute('aria-expanded', String(isHidden));
}
function setLanguage(lang){
  const dictionary = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element)=>{
    const key = element.dataset.i18n;
    if(dictionary[key] != null){
      element.innerHTML = dictionary[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element)=>{
    const key = element.dataset.i18nPlaceholder;
    if(dictionary[key] != null){
      element.placeholder = dictionary[key];
    }
  });
  currentLanguage = lang;
  localStorage.setItem('newsLanguage', lang);
  langCurrent.textContent = languageNames[lang];
  langOptions.forEach((option)=>{
    option.classList.toggle('active', option.dataset.langOption=== lang);
  });
  refreshThemeButton();
  newsWeather.update(currentLanguage, translations);
  if(formMessage.dataset.messageKey){
    showFormMessage(formMessage.dataset.messageKey, formMessage.classList.contains('is-error'));
  }
  if(activeGlanceArticle){
    updateGlanceContent(activeGlanceArticle);
  }
  closeLanguageMenu();
}

//themeX
function setTheme(theme){
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  currentTheme = theme;
  localStorage.setItem('newsTheme', theme);
  updateThemeAssets(theme);
  refreshThemeButton();
}
function refreshThemeButton(){
  const dictionary = translations[currentLanguage];
  const label = `${dictionary.themeToggleLabel}: ${currentTheme === 'dark' ? dictionary.themeLight : dictionary.themeDark}`;
  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
}
function clearFormMessage(){
  formMessage.dataset.messageKey = '';
  formMessage.classList.remove('is-error');
  formMessageIcon.src = 'icons/error.png';
  formMessageIcon.classList.add('hidden');
  formMessageText.textContent = '';
}
function showFormMessage(messageKey, isError = false){
  const dictionary = translations[currentLanguage];
  formMessage.dataset.messageKey = messageKey;
  formMessage.classList.toggle('is-error', isError);
  formMessageIcon.src = isError ? 'icons/error.png' : 'icons/OK.png?v=2';
  formMessageIcon.classList.remove('hidden');
  formMessageText.textContent = dictionary[messageKey] ?? '';
}
function setActiveCategory(category){
  activeCategory = category;
  chips.forEach((chip)=>{
    chip.classList.toggle('active', chip.dataset.category === category);
  });
  applyFilters();
}
function applyFilters(){
  const query = searchInput.value.trim().toLowerCase();
  articles.forEach((article)=>{
    const title = article.querySelector('h3').textContent.toLowerCase();
    const body = article.querySelector('p').textContent.toLowerCase();
    const category = article.dataset.category;
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesSearch = !query || title.includes(query) || body.includes(query) || category.includes(query);
    article.classList.toggle('hidden', !(matchesCategory && matchesSearch));
  });
}

//filtrsX
chips.forEach((chip)=>{
  chip.addEventListener('click', ()=>{
    setActiveCategory(chip.dataset.category);
  });
});

//story cards
articles.forEach((article)=>{
  article.setAttribute('tabindex', '0');
  article.setAttribute('role', 'button');
  article.setAttribute('aria-haspopup', 'dialog');

  article.addEventListener('click', ()=>{
    openGlance(article);
  });
  article.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      openGlance(article);
    }
  });
});

//eventsX
searchInput.addEventListener('input', applyFilters);
langToggle.addEventListener('click', toggleLanguageMenu);
langOptions.forEach((option)=>{
  option.addEventListener('click', ()=>{
    setLanguage(option.dataset.langOption);
  });
});
themeToggle.addEventListener('click', ()=>{
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});
newsletterForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  if(!emailInput.value.trim()){
    showFormMessage('supportErrorEmpty', true);
    emailInput.focus();
    return;
  }
  if(!emailInput.checkValidity()){
    showFormMessage('supportErrorInvalid', true);
    emailInput.focus();
    return;
  }
  showFormMessage('supportSuccess');
  newsletterForm.reset();
});
emailInput.addEventListener('input', ()=>{
  if(formMessage.dataset.messageKey){
    clearFormMessage();
  }
});
glanceClose.addEventListener('click', closeGlance);
glanceOverlay.addEventListener('click', (event)=>{
  if(event.target === glanceOverlay){
    closeGlance();
  }
});
document.addEventListener('keydown', (event)=>{
  if(event.key === 'Escape' && !langMenu.classList.contains('hidden')){
    closeLanguageMenu();
  }
  if(event.key === 'Escape' && !glanceOverlay.classList.contains('hidden')){
    closeGlance();
  }
});
document.addEventListener('click', (event)=>{
  if(!langPicker.contains(event.target)){
    closeLanguageMenu();
  }
});

//initX
clearFormMessage();
setLanguage(currentLanguage);
setTheme(currentTheme);
applyFilters();
newsWeather.load(currentLanguage, translations);
setInterval(()=>{
  newsWeather.load(currentLanguage, translations);
},900000);