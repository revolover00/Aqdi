import { ContractType } from '../../types';

export const CONTRACT_TEMPLATES: Record<ContractType, {
  en: { title: string; clauses: string[] };
  ar: { title: string; clauses: string[] };
}> = {
  'web-development': {
    en: {
      title: 'Web Development Services Agreement',
      clauses: [
        'The Freelancer shall design, develop, and deliver a fully functional web application as detailed in the scope of work.',
        'The Client agrees to pay the stipulated amount based on the payment milestones. Delays in payments may result in suspension of work.',
        'Upon full payment, the Freelancer transfers all intellectual property and source code ownership of the website to the Client.'
      ]
    },
    ar: {
      title: 'اتفاقية تقديم خدمات تطوير المواقع الإلكترونية',
      clauses: [
        'يلتزم المستقل بتصميم وتطوير وتسليم موقع إلكتروني متكامل وفقاً لنطاق العمل المتفق عليه.',
        'يوافق العميل على دفع المبلغ المحدد بناءً على دفعات الإنجاز. قد ينجم عن تأخر الدفع تعليق العمل.',
        'تنتقل ملكية الكود المصدري والحقوق الفكرية بالكامل إلى العميل فور تسديد المستحقات المالية بالكامل.'
      ]
    }
  },
  'ui-design': {
    en: {
      title: 'UI/UX Design Agreement',
      clauses: [
        'The Freelancer shall provide user interface and user experience designs, including wireframes, mockups, and interactive prototypes.',
        'Deliverables shall be supplied via Figma files or shared interactive links.',
        'The Client is entitled to the specified number of revisions. Additional revisions will be billed separately.'
      ]
    },
    ar: {
      title: 'اتفاقية تقديم خدمات تصميم واجهات المستخدم UI/UX',
      clauses: [
        'يلتزم المستقل بتقديم تصميمات واجهة وتجربة المستخدم بما في ذلك النماذج الأولية والتفاعلية.',
        'يتم تسليم الأعمال عبر ملفات فيجما (Figma) أو روابط تفاعلية مشتركة للمعاينة.',
        'يحق للعميل الحصول على عدد التعديلات المحدد. وأي تعديل إضافي يتم احتسابه بمبلغ منفصل.'
      ]
    }
  },
  'content-writing': {
    en: {
      title: 'Professional Copywriting and Content Creation Services',
      clauses: [
        'The Freelancer shall create original written content including articles, blog posts, or marketing copy.',
        'All work must be highly checked for plagiarism and match the grammatical and branding guidelines of the Client.',
        'Publishing rights transfer to the Client upon invoice settlement.'
      ]
    },
    ar: {
      title: 'اتفاقية كتابة المحتوى وصناعة النصوص الاحترافية',
      clauses: [
        'يلتزم الكاتب بصناعة نصوص وكتابة مقالات أو مواد تسويقية أصلية خالية من الانتحال.',
        'يجب أن تتطابق جودة النصوص مع القواعد اللغوية والهوية التسويقية الخاصة بالعميل.',
        'تنتقل حقوق النشر للعميل مباشرة بعد سداد القيمة الإجمالية للعقد.'
      ]
    }
  },
  'social-media': {
    en: {
      title: 'Social Media Management Agreement',
      clauses: [
        'The Freelancer will manage designated social accounts, curate weekly calendars, and post high-quality designs.',
        'The Client is responsible for advertising budget, product photography, and formal business updates.',
        'Performance reports shall be delivered monthly to summarize audience growth and engagement.'
      ]
    },
    ar: {
      title: 'اتفاقية إدارة حسابات التواصل الاجتماعي والشبكات',
      clauses: [
        'يلتزم المستقل بإدارة القنوات وتجهيز خطة النشر الأسبوعية ونشر المنشورات والتصاميم.',
        'يتحمل العميل ميزانية الإعلانات الممولة وتوفير صور المنتجات والمعلومات التجارية.',
        'يتم توفير تقرير أداء شهري يوضح نسب نمو وتفاعل المتابعين والجمهور.'
      ]
    }
  },
  'video-editing': {
    en: {
      title: 'Video Post-Production & Editing Agreement',
      clauses: [
        'The Freelancer shall compile, edit, color-grade, and add sound design to raw footage supplied by the Client.',
        'Final outputs shall be rendered in full HD/4K quality and delivered via cloud storage platforms.',
        'Turnaround times depend on prompt feedback and raw footage delivery timelines.'
      ]
    },
    ar: {
      title: 'اتفاقية أعمال مونتاج وتحرير الفيديو',
      clauses: [
        'يلتزم المونتير بقص وتنسيق وتعديل ألوان وإضافة مؤثرات صوتية للمواد الخام المقدمة من العميل.',
        'يتم تسليم الفيديو النهائي بالدقة المقررة عبر وسائط التخزين السحابية المتفق عليها.',
        'تعتمد سرعة تسليم الأعمال على سرعة إرسال الملاحظات وتسليم المواد الأولية.'
      ]
    }
  },
  'mobile-development': {
    en: {
      title: 'Mobile Application Development Services',
      clauses: [
        'The Freelancer will build a mobile app targeting iOS and Android platforms based on the documented design specifications.',
        'All app stores submission tasks are included. App store fees shall be covered strictly by the Client.',
        'A maintenance and support period shall be active for 30 days post-launch to address critical software bugs.'
      ]
    },
    ar: {
      title: 'اتفاقية برمجة وتطوير تطبيقات الهواتف الذكية',
      clauses: [
        'يتكفل المطور ببرمجة تطبيق جوال يستهدف منصات أندرويد وآي أو إس بناءً على مواصفات التصميم المستلمة.',
        'تشمل خدماتنا تولي عملية إرسال التطبيق للمتاجر، على أن يتكفل العميل برسوم الاشتراك للمتاجر.',
        'يتم تقديم فترة دعم فني مجانية لمدة 30 يوماً بعد الإطلاق لمعالجة الثغرات والعيوب التقنية.'
      ]
    }
  }
};
