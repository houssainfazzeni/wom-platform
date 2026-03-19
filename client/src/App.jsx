import { useMemo, useState } from 'react';

const content = {
  fr: {
    langLabel: 'FR',
    switchLabel: 'AR',
    title: 'Cahier des charges — World of Métallique (WOM)',
    subtitle:
      'Complexe industriel métallique intégré, plateforme digitale, marketing international, location matériel BTP et centre de formation.',
    vision:
      'Créer un écosystème industriel moderne capable de générer de la valeur à chaque étape avec une priorité absolue à la rentabilité.',
    objective:
      'Maximiser le profit, structurer le travail, automatiser les flux et faciliter l’expansion nationale et internationale.',
    sections: {
      context: 'Contexte & problématique',
      scope: 'Périmètre',
      stakeholders: 'Parties prenantes',
      modules: 'Fonctionnalités principales',
      workflow: 'Méthodologie de travail',
      finance: 'Règles de gestion financière',
      technical: 'Exigences techniques',
      constraints: 'Contraintes',
      kpi: 'KPIs de pilotage',
      roadmap: 'Planning prévisionnel',
      future: 'Évolutions futures',
    },
  },
  ar: {
    langLabel: 'AR',
    switchLabel: 'FR',
    title: 'دفتر الشروط — عالم المِتالّيك (WOM)',
    subtitle:
      'مجمع صناعي معدني متكامل + منصة رقمية + تسويق دولي + كراء معدات البناء + مركز تكوين.',
    vision:
      'بناء منظومة صناعية حديثة تولّد قيمة في كل مرحلة مع أولوية مطلقة للربحية.',
    objective:
      'تعظيم الربح، تنظيم العمل، أتمتة التدفقات، وتسهيل التوسع وطنياً ودولياً.',
    sections: {
      context: 'السياق والإشكاليات',
      scope: 'نطاق المشروع',
      stakeholders: 'الأطراف المعنية',
      modules: 'الوظائف الرئيسية',
      workflow: 'منهجية العمل',
      finance: 'القواعد المالية',
      technical: 'المتطلبات التقنية',
      constraints: 'القيود',
      kpi: 'مؤشرات الأداء',
      roadmap: 'الجدول الزمني',
      future: 'التطورات المستقبلية',
    },
  },
};

const scopeItems = [
  'Société industrielle métallurgique (World of Métallique)',
  'Plateforme digitale centralisée (commandes, partenaires, flux financiers)',
  'International Service Marketing',
  'Location matériel BTP',
  'Centre de formation professionnelle',
];

const stakeholders = [
  'Fondateur / Direction générale',
  'Équipe technique (fabrication)',
  'Équipe marketing & commerciale',
  'Développeurs plateforme',
  'Fournisseurs de matières premières',
  'Sous-traitants et artisans',
  'Clients B2B / B2C',
  'Banques et investisseurs',
];

const modules = [
  ['Gestion des utilisateurs & rôles', 'Admin, clients, fournisseurs, sous-traitants, marketeurs, formateurs', '6 jours'],
  ['Commandes', 'Création, upload fichiers, statut, historique', '8 jours'],
  ['Devis', 'Automatique + manuel, marges, PDF, validation client', '8 jours'],
  ['Fournisseurs', 'Classement par prix/proximité/certification, sélection auto', '6 jours'],
  ['Production', 'Étude → fabrication → contrôle qualité → livraison', '6 jours'],
  ['Paiement & finance', 'Paiement en ligne, répartition bénéfices, traçabilité', '10 jours'],
  ['Marketing commissions', 'Attribution et calcul automatique des commissions', '5 jours'],
  ['Location BTP', 'Catalogue, disponibilité, réservation, facturation', '8 jours'],
  ['Formation', 'Catalogue, inscriptions, gestion formateurs, paiement', '7 jours'],
];

const workflow = [
  'Réception demande client',
  'Étude technique et financière',
  'Sélection fournisseurs',
  'Fabrication / sous-traitance',
  'Contrôle qualité',
  'Livraison',
  'Paiement',
  'Répartition des bénéfices',
  'Réinvestissement',
];

const financeRules = [
  'Priorité au profit de la plateforme et de la société mère',
  'Marges intégrées automatiquement',
  'Transparence interne totale',
  'Traçabilité de chaque dinar',
];

const technical = [
  'Web responsive, design professionnel en couleurs industrielles',
  'Sécurité élevée (authentification forte, rôles, permissions, audit)',
  'Architecture modulaire et évolutive',
  'Stack recommandée: React + Node.js/Firebase + base sécurisée + cloud',
  'Multilingue AR/FR avec base de données commune',
];

const constraints = [
  'Budget maîtrisé',
  'Solutions gratuites ou low-cost au démarrage',
  'Respect du cadre légal tunisien',
];

const kpis = ['Nombre de commandes', 'Taux de marge', 'Délai de production', 'Rentabilité mensuelle', 'Satisfaction client'];

const roadmap = [
  ['Conception', '1 mois'],
  ['Développement MVP', '2 mois'],
  ['Tests', '1 mois'],
  ['Lancement', '1 mois'],
];

const future = ['Application mobile', 'Expansion internationale', 'IA pour devis', 'Automatisation complète des flux'];

function ListCard({ title, items }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function App() {
  const [lang, setLang] = useState('fr');
  const t = content[lang];
  const totalModuleDays = useMemo(
    () => modules.reduce((acc, [, , days]) => acc + Number.parseInt(days, 10), 0),
    [],
  );

  return (
    <main className={`container ${lang === 'ar' ? 'rtl' : ''}`}>
      <header className="hero card-dark">
        <div className="hero-top">
          <p className="badge">{t.langLabel}</p>
          <button type="button" className="switch" onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}>
            {t.switchLabel}
          </button>
        </div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <p>
          <strong>Vision:</strong> {t.vision}
        </p>
        <p>
          <strong>Objectif:</strong> {t.objective}
        </p>
      </header>

      <section className="grid two">
        <ListCard
          title={t.sections.context}
          items={[
            'Désorganisation du secteur métallique',
            'Manque de transparence des prix',
            'Absence de plateforme centralisée',
            'Faible digitalisation en Tunisie',
          ]}
        />
        <ListCard title={t.sections.scope} items={scopeItems} />
      </section>

      <section className="grid two">
        <ListCard title={t.sections.stakeholders} items={stakeholders} />
        <ListCard title={t.sections.workflow} items={workflow} />
      </section>

      <section className="card">
        <div className="section-title">
          <h2>{t.sections.modules}</h2>
          <span>{totalModuleDays} jours</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Détails</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(([module, details, duration]) => (
              <tr key={module}>
                <td>{module}</td>
                <td>{details}</td>
                <td>{duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid three">
        <ListCard title={t.sections.finance} items={financeRules} />
        <ListCard title={t.sections.technical} items={technical} />
        <ListCard title={t.sections.constraints} items={constraints} />
      </section>

      <section className="grid two">
        <article className="card">
          <h2>{t.sections.roadmap}</h2>
          <div className="timeline">
            {roadmap.map(([phase, duration]) => (
              <div key={phase} className="timeline-item">
                <h3>{phase}</h3>
                <p>{duration}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <h2>{t.sections.kpi}</h2>
          <ul>
            {kpis.map((kpi) => (
              <li key={kpi}>{kpi}</li>
            ))}
          </ul>
          <h2 className="future-title">{t.sections.future}</h2>
          <ul>
            {future.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
