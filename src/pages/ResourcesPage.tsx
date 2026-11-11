import { useEffect } from 'react';
import { ArrowLeft, Book, Calculator, ExternalLink, Gamepad2, Globe, LucideIcon, Microscope, Sparkles, Shapes } from 'lucide-react';
import ExamsBox from '../components/ExamsBox';
import FontLink from '../components/FontLink';
import { formatShortDate as formatDate, toLocalIsoDate } from '../domain/data/examenes2Data';
import { getSubjectResources, getYoutubeEmbedUrl, type Resource, type ResourceKind } from '../domain/data/recursos2Data';
import type { Subject } from '../features/app/types';
import { cn } from '../styles/cn';
import { layout } from '../styles/tokens';

interface ResourcesPageProps {
  subject: Subject;
  onBack: () => void;
}

const subjectInfo: Record<Exclude<Subject, null>, { title: string; icon: LucideIcon }> = {
  matematicas: { title: 'Matemáticas', icon: Calculator },
  lengua: { title: 'Lengua', icon: Book },
  english: { title: 'English', icon: Globe },
  science: { title: 'Science', icon: Microscope }
};

const kindInfo: Record<Exclude<ResourceKind, 'video'>, { label: string; icon: LucideIcon; tone: string }> = {
  juegos: { label: 'Varios juegos', icon: Shapes, tone: 'bg-amber-100 text-amber-700' },
  juego: { label: 'Juego', icon: Gamepad2, tone: 'bg-sky-100 text-sky-700' },
  interactivo: { label: 'Interactivo', icon: Sparkles, tone: 'bg-fuchsia-100 text-fuchsia-700' }
};

const VideoCard = ({ resource }: { resource: Resource }): JSX.Element | null => {
  const embedUrl = getYoutubeEmbedUrl(resource.url);
  if (!embedUrl) return null;
  return (
    <figure className="bg-white rounded-[2rem] border-4 border-rose-100 shadow-sm overflow-hidden">
      <div className="aspect-video bg-slate-900">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title={resource.title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="px-5 py-3 flex items-center justify-between gap-3 text-lg font-bold text-slate-700">
        <span>{resource.title}</span>
        <span className="text-sm text-slate-400 shrink-0">{formatDate(resource.date)}</span>
      </figcaption>
    </figure>
  );
};

const LinkCard = ({ resource }: { resource: Resource }): JSX.Element => {
  const info = kindInfo[resource.kind as Exclude<ResourceKind, 'video'>];
  const Icon = info.icon;
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-white rounded-[2rem] border-4 border-indigo-100 p-4 shadow-sm hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg transition-all"
    >
      <span className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', info.tone)}><Icon size={28} /></span>
      <span className="flex-1 min-w-0">
        <span className="block text-xl font-black text-slate-800 leading-tight">{resource.title}</span>
        <span className="block text-sm font-bold text-slate-400 mt-1">{info.label} · {formatDate(resource.date)}</span>
      </span>
      <ExternalLink size={22} className="text-indigo-300 shrink-0" aria-hidden="true" />
    </a>
  );
};

const ResourcesPage = ({ subject, onBack }: ResourcesPageProps): JSX.Element => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [subject]);

  const data = getSubjectResources(subject);
  const info = subject ? subjectInfo[subject] : null;
  const Icon = info?.icon ?? Book;

  return (
    <div className={cn(layout.pageRoot, 'px-4 sm:px-8')} style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <div className="w-full max-w-5xl flex justify-start mb-10">
        <button onClick={onBack} className={layout.backButton}><ArrowLeft strokeWidth={3} /> Asignaturas</button>
      </div>
      <div className="flex items-center gap-4 sm:gap-6 text-4xl sm:text-6xl font-black text-indigo-900 mb-2"><Icon size={56} className="text-indigo-500 shrink-0" /> {info?.title} 2º</div>
      <p className="text-xl font-bold text-slate-500 mb-12 text-center">Vídeos y juegos que nos manda la seño</p>

      <ExamsBox subject={subject} today={toLocalIsoDate(new Date())} />

      <div className="w-full max-w-5xl space-y-14">
        {!data?.blocks.length && <p className="text-2xl font-bold text-slate-400 text-center">Todavía no hay recursos.</p>}
        {data?.blocks.map(block => {
          const videos = block.resources.filter(r => r.kind === 'video');
          const links = block.resources.filter(r => r.kind !== 'video');
          return (
            <section key={block.id} aria-labelledby={`block-${block.id}`}>
              <h2 id={`block-${block.id}`} className="text-3xl sm:text-4xl font-black text-slate-800">{block.title}</h2>
              {block.desc && <p className="text-lg font-bold text-slate-500 mt-1">{block.desc}</p>}
              {videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {videos.map(v => <VideoCard key={v.url} resource={v} />)}
                </div>
              )}
              {links.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {links.map(l => <LinkCard key={l.url} resource={l} />)}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesPage;
