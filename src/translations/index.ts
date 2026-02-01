export interface Translation {
  appTitle: string;
  quranVerse: string;
  quranTranslation: string;
  form: {
    title: string;
    totalAssets: string;
    debtAmount: string;
    financialLiabilities: string;
    bequestsAmount: string;
    distributableEstate: string;
    genderDeceased: string;
    male: string;
    female: string;
    relationToDeceased: string;
    parentsAlive: string;
    father: string;
    mother: string;
    both: string;
    none: string;
    childrenOfDeceased: string;
    sons: string;
    daughters: string;
    siblingsOfDeceased: string;
    brothers: string;
    sisters: string;
    spouseStatus: string;
    hasSpouse: string;
    noSpouse: string;
    calculate: string;
  };
  results: {
    title: string;
    heir: string;
    relationship: string;
    share: string;
    amount: string;
    downloadPDF: string;
    netEstate: string;
    generatedOn: string;
  };
  heirs: {
    wife: string;
    husband: string;
    father: string;
    mother: string;
    son: string;
    daughter: string;
    brother: string;
    sister: string;
    [key: string]: string;
  };
  relationships: {
    spouse: string;
    parent: string;
    child: string;
    sibling: string;
    [key: string]: string;
  };
  shares: {
    '2x_residue': string;
    '1x_residue': string;
    residue: string;
    sole_heir: string;
    [key: string]: string;
  };
}

export const translations: Record<string, Translation> = {
  english: {
    appTitle: "Islamic Inheritance Calculator",
    quranVerse: "Allah instructs you concerning your children: for the male, what is equal to the share of two females. But if there are [only] daughters, two or more, for them is two thirds of one's estate. And if there is only one, for her is half. And for one's parents, to each one of them is a sixth of his estate if he left children. But if he had no children and the parents [alone] inherit from him, then for his mother is one third.",
    quranTranslation: "Surah An-Nisa (4:11)",
    form: {
      title: "Inheritance Details",
      totalAssets: "Total Assets (Monetary Value)",
      debtAmount: "Total amount of debt owed by the deceased to individuals or institutions",
      bequestsAmount: "Total amount of bequests made by the deceased in their will",
      distributableEstate: "Total amount of the distributable estate",
      financialLiabilities: "Financial Liabilities (Debts)",
      genderDeceased: "Gender of Deceased",
      male: "Male",
      female: "Female",
      relationToDeceased: "Relation to Deceased",
      parentsAlive: "Parents of Deceased",
      father: "Father Only",
      mother: "Mother Only",
      both: "Both Alive",
      none: "None",
      childrenOfDeceased: "Children of Deceased",
      sons: "Number of Sons",
      daughters: "Number of Daughters",
      siblingsOfDeceased: "Siblings of Deceased",
      brothers: "Number of Brothers",
      sisters: "Number of Sisters",
      spouseStatus: "Spouse Status",
      hasSpouse: "Has Spouse",
      noSpouse: "No Spouse",
      calculate: "Calculate Inheritance",
    },
    results: {
      title: "Inheritance Distribution",
      heir: "Heir",
      relationship: "Relationship",
      share: "Share",
      amount: "Amount",
      downloadPDF: "Download PDF",
      netEstate: "Net Estate (after debts)",
      generatedOn: "Generated on",
    },
    heirs: {
      wife: "Wife",
      husband: "Husband",
      father: "Father",
      mother: "Mother",
      son: "Son",
      daughter: "Daughter",
      brother: "Brother",
      sister: "Sister",
    },
    relationships: {
      spouse: "Spouse",
      parent: "Parent",
      child: "Child",
      sibling: "Sibling",
    },
    shares: {
      '2x_residue': '2x (Residue)',
      '1x_residue': '1x (Residue)',
      residue: 'Residue',
      sole_heir: 'Sole Heir',
    },
  },

  urdu: {
    appTitle: "اسلامی وراثت کا حساب کتاب",
    quranVerse: "اللہ تمہیں تمہاری اولاد کے بارے میں حکم دیتا ہے: مرد کے لیے دو عورتوں کے برابر حصہ ہے۔ اگر دو سے زیادہ لڑکیاں ہوں تو انہیں دو تہائی ترکہ ملے گا۔ اور اگر ایک ہی ہو تو اس کے لیے آدھا ہے۔ اور والدین میں سے ہر ایک کے لیے چھٹا حصہ ہے اگر میت کی اولاد ہو۔",
    quranTranslation: "سورہ النساء (4:11)",
    form: {
      title: "وراثت کی تفصیلات",
      totalAssets: "کل اثاثے",
      financialLiabilities: "مالی ذمہ داریاں (قرض)",
      debtAmount: "میت کے ذمہ افراد اور اداروں کی واجب الادا قرض کی کُل رقم",
      bequestsAmount: "میت کی اداروں یا افراد کے حق میں کی گئی وصیت کی کُل رقم",
      distributableEstate: "قابلِ تقسیم ترکے کی کل رقم",
      genderDeceased: "میت کی جنس",
      male: "مرد",
      female: "عورت",
      relationToDeceased: "میت سے تعلق",
      parentsAlive: "میت کے والدین",
      father: "صرف والد",
      mother: "صرف والدہ",
      both: "دونوں زندہ",
      none: "کوئی نہیں",
      childrenOfDeceased: "میت کی اولاد",
      sons: "بیٹوں کی تعداد",
      daughters: "بیٹیوں کی تعداد",
      siblingsOfDeceased: "میت کے بہن بھائی",
      brothers: "بھائیوں کی تعداد",
      sisters: "بہنوں کی تعداد",
      spouseStatus: "شریک حیات کی حالت",
      hasSpouse: "شریک حیات موجود",
      noSpouse: "شریک حیات نہیں",
      calculate: "وراثت کا حساب لگائیں",
    },
    results: {
      title: "وراثت کی تقسیم",
      heir: "وارث",
      relationship: "رشتہ",
      share: "حصہ",
      amount: "رقم",
      downloadPDF: "حسابات کی رپورٹ پی ڈی ایف (pdf) کی شکل میں حاصل کریں",
      netEstate: "خالص ترکہ (قرض کے بعد)",
      generatedOn: "تیار شدہ تاریخ",
    },
    heirs: {
      wife: "بیوی",
      husband: "شوہر",
      father: "والد",
      mother: "والدہ",
      son: "بیٹا",
      daughter: "بیٹی",
      brother: "بھائی",
      sister: "بہن",
    },
    relationships: {
      spouse: "شریک حیات",
      parent: "والدین",
      child: "اولاد",
      sibling: "بہن بھائی",
    },
    shares: {
      '2x_residue': '2x (عصبہ)',
      '1x_residue': '1x (عصبہ)',
      residue: 'عصبہ',
      sole_heir: 'واحد وارث',
    },
  },

  hindi: {
    appTitle: "इस्लामी विरासत कैलकुलेटर",
    quranVerse: "अल्लाह तुम्हें तुम्हारी संतान के बारे में आदेश देता है: पुरुष के लिए दो महिलाओं के बराबर हिस्सा है। लेकिन अगर केवल बेटियां हैं, दो या अधिक, तो उनके लिए संपत्ति का दो तिहाई है। और अगर केवल एक है, तो उसके लिए आधा है।",
    quranTranslation: "सूरह अन-निसा (4:11)",
    form: {
      title: "विरासत विवरण",
      totalAssets: "कुल संपत्ति",
      financialLiabilities: "वित्तीय देनदारियां (ऋण)",
      debtAmount: "मृतक द्वारा व्यक्तियों या संस्थानों को देय कुल ऋण राशि",
      bequestsAmount: "मृतक द्वारा अपनी वसीयत में किए गए वसीयत की कुल राशि",
      distributableEstate: "वितरणीय संपत्ति की कुल राशि",
      genderDeceased: "मृतक का लिंग",
      male: "पुरुष",
      female: "महिला",
      relationToDeceased: "मृतक से संबंध",
      parentsAlive: "मृतक के माता-पिता",
      father: "केवल पिता",
      mother: "केवल माता",
      both: "दोनों जीवित",
      none: "कोई नहीं",
      childrenOfDeceased: "मृतक की संतान",
      sons: "बेटों की संख्या",
      daughters: "बेटियों की संख्या",
      siblingsOfDeceased: "मृतक के भाई-बहन",
      brothers: "भाइयों की संख्या",
      sisters: "बहनों की संख्या",
      spouseStatus: "जीवनसाथी की स्थिति",
      hasSpouse: "जीवनसाथी है",
      noSpouse: "जीवनसाथी नहीं",
      calculate: "विरासत की गणना करें",
    },
    results: {
      title: "विरासत वितरण",
      heir: "उत्तराधिकारी",
      relationship: "रिश्ता",
      share: "हिस्सा",
      amount: "राशि",
      downloadPDF: "PDF डाउनलोड करें",
      netEstate: "शुद्ध संपत्ति (ऋण के बाद)",
      generatedOn: "बनाया गया दिनांक",
    },
    heirs: {
      wife: "पत्नी",
      husband: "पति",
      father: "पिता",
      mother: "माता",
      son: "बेटा",
      daughter: "बेटी",
      brother: "भाई",
      sister: "बहन",
    },
    relationships: {
      spouse: "जीवनसाथी",
      parent: "अभिभावक",
      child: "संतान",
      sibling: "भाई-बहन",
    },
    shares: {
      '2x_residue': '2x (शेषशा)',
      '1x_residue': '1x (शेषशा)',
      residue: 'शेषशा',
      sole_heir: 'एकमात्र उत्तराधिकारी',
    },
  },

  bangla: {
    appTitle: "ইসলামিক উত্তরাধিকার ক্যালকুলেটর",
    quranVerse: "আল্লাহ তোমাদের সন্তানদের সম্পর্কে নির্দেশ দেন: পুরুষের জন্য দুই নারীর সমান অংশ। কিন্তু যদি শুধুমাত্র কন্যা হয়, দুই বা তার বেশি, তাহলে তাদের জন্য সম্পত্তির দুই তৃতীয়াংশ। আর যদি শুধু একজন হয়, তাহলে তার জন্য অর্ধেক।",
    quranTranslation: "সূরা আন-নিসা (৪:১১)",
    form: {
      title: "উত্তরাধিকার বিবরণ",
      totalAssets: "মোট সম্পদ",
      financialLiabilities: "আর্থিক দায় (ঋণ)",
      debtAmount: "মৃতক দ্বারা ব্যক্তিদের বা প্রতিষ্ঠানগুলিকে দেওয়া মোট ঋণের পরিমাণ",
      bequestsAmount: "মৃতক দ্বারা তার উত্তরাধিকার নথিতে করা মোট ওসিয়তের পরিমাণ",
      distributableEstate: "বিতরণযোগ্য সম্পত্তির মোট পরিমাণ",
      genderDeceased: "মৃতের লিঙ্গ",
      male: "পুরুষ",
      female: "মহিলা",
      relationToDeceased: "মৃতের সাথে সম্পর্ক",
      parentsAlive: "মৃতের পিতামাতা",
      father: "শুধুমাত্র পিতা",
      mother: "শুধুমাত্র মাতা",
      both: "উভয়ই জীবিত",
      none: "কেউ নেই",
      childrenOfDeceased: "মৃতের সন্তান",
      sons: "পুত্রদের সংখ্যা",
      daughters: "কন্যাদের সংখ্যা",
      siblingsOfDeceased: "মৃতের ভাইবোন",
      brothers: "ভাইদের সংখ্যা",
      sisters: "বোনদের সংখ্যা",
      spouseStatus: "স্বামী/স্ত্রীর অবস্থা",
      hasSpouse: "স্বামী/স্ত্রী আছে",
      noSpouse: "স্বামী/স্ত্রী নেই",
      calculate: "উত্তরাধিকার গণনা করুন",
    },
    results: {
      title: "উত্তরাধিকার বন্টন",
      heir: "উত্তরাধিকারী",
      relationship: "সম্পর্ক",
      share: "অংশ",
      amount: "পরিমাণ",
      downloadPDF: "PDF ডাউনলোড",
      netEstate: "নিট সম্পত্তি (ঋণের পরে)",
      generatedOn: "তৈরির তারিখ",
    },
    heirs: {
      wife: "স্ত্রী",
      husband: "স্বামী",
      father: "পিতা",
      mother: "মাতা",
      son: "পুত্র",
      daughter: "কন্যা",
      brother: "ভাই",
      sister: "বোন",
    },
    relationships: {
      spouse: "স্বামী/স্ত্রী",
      parent: "পিতামাতা",
      child: "সন্তান",
      sibling: "ভাইবোন",
    },
    shares: {
      '2x_residue': '2x (আসাবা)',
      '1x_residue': '1x (আসাবা)',
      residue: 'আসাবা',
      sole_heir: 'একমাত্র উত্তরাধিকারী',
    },
  },

  arabic: {
    appTitle: "حاسبة الميراث الإسلامي",
    quranVerse: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ ۚ فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
    quranTranslation: "سورة النساء (4:11)",
    form: {
      title: "تفاصيل الميراث",
      totalAssets: "إجمالي الأصول",
      financialLiabilities: "الالتزامات المالية (الديون)",
      debtAmount: "إجمالي مبلغ الدين المستحق على المتوفى للأفراد أو المؤسسات",
      bequestsAmount: "إجمالي مبلغ الوصايا التي قام بها المتوفى في وصيته",
      distributableEstate: "إجمالي مبلغ التركة القابلة للتوزيع",
      genderDeceased: "جنس المتوفى",
      male: "ذكر",
      female: "أنثى",
      relationToDeceased: "العلاقة بالمتوفى",
      parentsAlive: "والدا المتوفى",
      father: "الأب فقط",
      mother: "الأم فقط",
      both: "كلاهما على قيد الحياة",
      none: "لا أحد",
      childrenOfDeceased: "أطفال المتوفى",
      sons: "عدد الأبناء",
      daughters: "عدد البنات",
      siblingsOfDeceased: "إخوة المتوفى",
      brothers: "عدد الإخوة",
      sisters: "عدد الأخوات",
      spouseStatus: "حالة الزوج",
      hasSpouse: "له زوج",
      noSpouse: "لا يوجد زوج",
      calculate: "حساب الميراث",
    },
    results: {
      title: "توزيع الميراث",
      heir: "الوارث",
      relationship: "العلاقة",
      share: "الحصة",
      amount: "المبلغ",
      downloadPDF: "تحميل PDF",
      netEstate: "التركة الصافية (بعد الديون)",
      generatedOn: "تاريخ الإنشاء",
    },
    heirs: {
      wife: "زوجة",
      husband: "زوج",
      father: "الأب",
      mother: "الأم",
      son: "ابن",
      daughter: "ابنة",
      brother: "أخ",
      sister: "أخت",
    },
    relationships: {
      spouse: "زوجي",
      parent: "والد",
      child: "ابن",
      sibling: "أخ",
    },
    shares: {
      '2x_residue': '2x (عصبة)',
      '1x_residue': '1x (عصبة)',
      residue: 'عصبة',
      sole_heir: 'وارث وحيد',
    },
  },

  bahasa: {
    appTitle: "Kalkulator Warisan Islam",
    quranVerse: "Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan. Jika anak itu semuanya perempuan yang jumlahnya lebih dari dua, maka bagian mereka dua pertiga dari harta yang ditinggalkan.",
    quranTranslation: "Surah An-Nisa (4:11)",
    form: {
      title: "Rincian Warisan",
      totalAssets: "Total Aset",
      financialLiabilities: "Kewajiban Keuangan (Hutang)",
      debtAmount: "Jumlah total hutang yang terutang oleh almarhum kepada individu atau institusi",
      bequestsAmount: "Jumlah total wasiat yang dibuat oleh almarhum dalam wasiatnya",
      distributableEstate: "Jumlah total harta warisan yang dapat dibagikan",
      genderDeceased: "Jenis Kelamin Almarhum",
      male: "Laki-laki",
      female: "Perempuan",
      relationToDeceased: "Hubungan dengan Almarhum",
      parentsAlive: "Orang Tua Almarhum",
      father: "Hanya Ayah",
      mother: "Hanya Ibu",
      both: "Keduanya Hidup",
      none: "Tidak Ada",
      childrenOfDeceased: "Anak-anak Almarhum",
      sons: "Jumlah Anak Laki-laki",
      daughters: "Jumlah Anak Perempuan",
      siblingsOfDeceased: "Saudara Kandung Almarhum",
      brothers: "Jumlah Saudara Laki-laki",
      sisters: "Jumlah Saudara Perempuan",
      spouseStatus: "Status Pasangan",
      hasSpouse: "Memiliki Pasangan",
      noSpouse: "Tidak Ada Pasangan",
      calculate: "Hitung Warisan",
    },
    results: {
      title: "Pembagian Warisan",
      heir: "Ahli Waris",
      relationship: "Hubungan",
      share: "Bagian",
      amount: "Jumlah",
      downloadPDF: "Unduh PDF",
      netEstate: "Harta Bersih (setelah hutang)",
      generatedOn: "Dibuat pada",
    },
    heirs: {
      wife: "Istri",
      husband: "Suami",
      father: "Ayah",
      mother: "Ibu",
      son: "Anak Laki-laki",
      daughter: "Anak Perempuan",
      brother: "Saudara Laki-laki",
      sister: "Saudara Perempuan",
    },
    relationships: {
      spouse: "Pasangan",
      parent: "Orang Tua",
      child: "Anak",
      sibling: "Saudara Kandung",
    },
    shares: {
      '2x_residue': '2x (Asaba)',
      '1x_residue': '1x (Asaba)',
      residue: 'Asaba',
      sole_heir: 'Satu-satunya Ahli Waris',
    },
  },

  malay: {
    appTitle: "Kalkulator Pusaka Islam",
    quranVerse: "Allah mensyariatkan kepada kamu tentang (pembahagian pusaka untuk) anak-anak kamu: bahagian seorang anak lelaki menyamai bahagian dua orang anak perempuan. Jika anak-anak itu semuanya perempuan lebih dari dua, maka bahagian mereka dua pertiga dari harta yang ditinggalkan.",
    quranTranslation: "Surah An-Nisa (4:11)",
    form: {
      title: "Butiran Pusaka",
      totalAssets: "Jumlah Aset",
      financialLiabilities: "Liabiliti Kewangan (Hutang)",
      debtAmount: "Jumlah keseluruhan hutang yang terhutang oleh si mati kepada individu atau institusi",
      bequestsAmount: "Jumlah keseluruhan wasiat yang dibuat oleh si mati dalam wasiatnya",
      distributableEstate: "Jumlah keseluruhan harta pusaka yang boleh diagihkan",
      genderDeceased: "Jantina Si Mati",
      male: "Lelaki",
      female: "Perempuan",
      relationToDeceased: "Hubungan dengan Si Mati",
      parentsAlive: "Ibu Bapa Si Mati",
      father: "Bapa Sahaja",
      mother: "Ibu Sahaja",
      both: "Kedua-duanya Hidup",
      none: "Tiada",
      childrenOfDeceased: "Anak-anak Si Mati",
      sons: "Bilangan Anak Lelaki",
      daughters: "Bilangan Anak Perempuan",
      siblingsOfDeceased: "Adik-beradik Si Mati",
      brothers: "Bilangan Saudara Lelaki",
      sisters: "Bilangan Saudara Perempuan",
      spouseStatus: "Status Pasangan",
      hasSpouse: "Mempunyai Pasangan",
      noSpouse: "Tiada Pasangan",
      calculate: "Kira Pusaka",
    },
    results: {
      title: "Pembahagian Pusaka",
      heir: "Waris",
      relationship: "Hubungan",
      share: "Bahagian",
      amount: "Jumlah",
      downloadPDF: "Muat Turun PDF",
      netEstate: "Harta Bersih (selepas hutang)",
      generatedOn: "Dibuat pada",
    },
    heirs: {
      wife: "Isteri",
      husband: "Suami",
      father: "Bapa",
      mother: "Ibu",
      son: "Anak Lelaki",
      daughter: "Anak Perempuan",
      brother: "Saudara Lelaki",
      sister: "Saudara Perempuan",
    },
    relationships: {
      spouse: "Pasangan",
      parent: "Ibu Bapa",
      child: "Anak",
      sibling: "Adik-beradik",
    },
    shares: {
      '2x_residue': '2x (Asaba)',
      '1x_residue': '1x (Asaba)',
      residue: 'Asaba',
      sole_heir: 'Waris Tunggal',
    },
  },

  french: {
    appTitle: "Calculateur d'Héritage Islamique",
    quranVerse: "Allah vous commande, en ce qui concerne vos enfants: au garçon, une part équivalente à celle de deux filles. S'il n'y a que des filles, même plus de deux, à elles alors deux tiers de ce que le défunt laisse. Et s'il n'y en a qu'une, à elle alors la moitié.",
    quranTranslation: "Sourate An-Nisa (4:11)",
    form: {
      title: "Détails de l'Héritage",
      totalAssets: "Actifs Totaux",
      financialLiabilities: "Passifs Financiers (Dettes)",
      debtAmount: "Montant total des dettes dues par le défunt à des particuliers ou des institutions",
      bequestsAmount: "Montant total des legs faits par le défunt dans son testament",
      distributableEstate: "Montant total de la succession distribuable",
      genderDeceased: "Sexe du Défunt",
      male: "Homme",
      female: "Femme",
      relationToDeceased: "Relation avec le Défunt",
      parentsAlive: "Parents du Défunt",
      father: "Père Seulement",
      mother: "Mère Seulement",
      both: "Tous Deux Vivants",
      none: "Aucun",
      childrenOfDeceased: "Enfants du Défunt",
      sons: "Nombre de Fils",
      daughters: "Nombre de Filles",
      siblingsOfDeceased: "Frères et Sœurs du Défunt",
      brothers: "Nombre de Frères",
      sisters: "Nombre de Sœurs",
      spouseStatus: "Statut du Conjoint",
      hasSpouse: "A un Conjoint",
      noSpouse: "Pas de Conjoint",
      calculate: "Calculer l'Héritage",
    },
    results: {
      title: "Distribution de l'Héritage",
      heir: "Héritier",
      relationship: "Relation",
      share: "Part",
      amount: "Montant",
      downloadPDF: "Télécharger PDF",
      netEstate: "Patrimoine Net (après dettes)",
      generatedOn: "Généré le",
    },
    heirs: {
      wife: "Épouse",
      husband: "Époux",
      father: "Père",
      mother: "Mère",
      son: "Fils",
      daughter: "Fille",
      brother: "Frère",
      sister: "Sœur",
    },
    relationships: {
      spouse: "Conjoint",
      parent: "Parent",
      child: "Enfant",
      sibling: "Frère/Sœur",
    },
    shares: {
      '2x_residue': '2x (Résidu)',
      '1x_residue': '1x (Résidu)',
      residue: 'Résidu',
      sole_heir: 'Héritier Unique',
    },
  },
};