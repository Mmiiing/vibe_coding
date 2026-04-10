import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code, Cpu, Smartphone, Layers, ArrowRight,
  Menu, X, MessageSquare, Zap, Play, Star, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Divider = () => <div className="w-full h-px bg-white/5" />;

const reviews = [
  { name: '김민준', role: '전 비전공자 → 카카오 입사', stars: 5, text: '1대1 과외로 3개월 만에 코딩 기초부터 포트폴리오까지 완성했어요. 현직 개발자 선생님이 제 코드를 직접 봐주시니까 실력이 눈에 띄게 올랐습니다.', avatar: 'KM' },
  { name: '이서연', role: '주니어 개발자 → 시니어 레벨업', stars: 5, text: '바이브 코딩 1대1 수업 덕분에 코드 퀄리티가 완전히 달라졌어요. 막연하게 알고 있던 개념들을 선생님이 실무 예시로 설명해주셔서 너무 좋았습니다.', avatar: 'LY' },
  { name: '박지훈', role: '취업준비생 → 스타트업 개발자', stars: 5, text: '포트폴리오가 없어서 막막했는데 바이브 코딩에서 1대1로 프로젝트 기획부터 배포까지 같이 해주셨어요. 6개월 안에 취업 성공했습니다!', avatar: 'PJ' },
  { name: '최유나', role: '디자이너 → 풀스택 전환', stars: 5, text: '디자이너에서 개발자로 전향하고 싶었는데 바이브 코딩 1대1 수업이 정말 큰 도움이 됐어요. 내 속도에 맞게 진도를 조절해주셔서 부담 없이 배울 수 있었습니다.', avatar: 'CY' },
  { name: '정다은', role: '문과 출신 → 앱 출시', stars: 5, text: '코딩이 너무 어렵게 느껴졌는데 바이브 코딩 선생님이 쉽게 풀어서 설명해주셨어요. 1대1이라 모르는 게 있을 때 바로 물어볼 수 있어서 진도가 빨랐어요.', avatar: 'JD' },
  { name: '오승현', role: '백엔드 주니어 → 대기업 이직', stars: 5, text: '시스템 설계 부분이 항상 약점이었는데 1대1로 집중적으로 파주신 덕에 기술 면접에서 자신 있게 답할 수 있었습니다. 이직 성공했어요!', avatar: 'OS' },
];

const curriculumTracks = [
  {
    id: 'backend',
    label: 'Backend',
    icon: <Layers size={16} />,
    weeks: [
      { week: 'W1–2', title: 'CS 기초 & 언어 심화', items: ['자료구조·알고리즘 집중 훈련', 'Java / Python 고급 문법', 'OOP·디자인 패턴 실전'] },
      { week: 'W3–4', title: 'DB 설계 & 최적화', items: ['ERD 설계 및 정규화', 'MySQL 인덱스·쿼리 튜닝', 'Redis 캐싱 전략'] },
      { week: 'W5–6', title: 'API & 서버 구축', items: ['REST API 설계 원칙', 'Spring Boot / FastAPI 실습', 'JWT 인증·보안 처리'] },
      { week: 'W7–8', title: '인프라 & 배포', items: ['Docker·Kubernetes 기초', 'AWS EC2·RDS·S3 구성', 'CI/CD 파이프라인 구축'] },
      { week: 'W9–12', title: '대용량 트래픽 & 포트폴리오', items: ['메시지 큐 (Kafka·RabbitMQ)', '시스템 설계 면접 대비', '실서비스 수준 포트폴리오 완성'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: <Smartphone size={16} />,
    weeks: [
      { week: 'W1–2', title: 'HTML·CSS·JS 기초 완성', items: ['시맨틱 HTML & 접근성', 'Flexbox·Grid 레이아웃', 'ES2024 핵심 문법'] },
      { week: 'W3–4', title: 'React 심화', items: ['컴포넌트 설계 & 상태관리', 'React Query·Zustand', '성능 최적화 (memo, lazy)'] },
      { week: 'W5–6', title: '애니메이션 & 인터랙션', items: ['GSAP ScrollTrigger 실전', 'Framer Motion 활용', 'Three.js / Spline 3D 입문'] },
      { week: 'W7–8', title: '풀스택 연동 & 배포', items: ['Next.js App Router', 'API 연동 & SSR·SSG', 'Vercel·Netlify 배포'] },
      { week: 'W9–12', title: '포트폴리오 & 면접', items: ['실서비스 UI 클론·개선', '반응형·다크모드 구현', '기술 면접 & 코드리뷰'] },
    ],
  },
  {
    id: 'career',
    label: 'Career',
    icon: <Cpu size={16} />,
    weeks: [
      { week: 'W1–2', title: '현황 분석 & 목표 설정', items: ['기술 스택 진단 및 보완 계획', '목표 기업 리서치', '채용 공고 분석 전략'] },
      { week: 'W3–5', title: '코딩테스트 완성', items: ['알고리즘 유형별 집중 훈련', '카카오·네이버 기출 풀이', '시간 내 풀이 전략'] },
      { week: 'W6–8', title: '포트폴리오 제작', items: ['프로젝트 기획·개발·배포', 'README & 기술 블로그 작성', 'GitHub 프로필 최적화'] },
      { week: 'W9–10', title: '서류 & 자기소개서', items: ['직무별 자소서 1대1 첨삭', '이력서 포맷 & 키워드 최적화', '포트폴리오 사이트 완성'] },
      { week: 'W11–12', title: '기술 면접 완성', items: ['CS·프레임워크 모의면접', '시스템 설계 인터뷰 대비', '최종 합격까지 피드백'] },
    ],
  },
];

const ReviewModal = ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(i => (i + 1) % reviews.length);
  const r = reviews[current];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div className="w-full max-w-lg bg-zinc-900 rounded-t-3xl p-8 pb-10"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#E2FF00] text-[10px] font-black tracking-[0.4em] uppercase">수강생 후기</span>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"><X size={16} /></button>
        </div>
        <div className="bg-zinc-800 rounded-2xl p-6 mb-5" key={current} style={{ animation: 'fadeIn 0.25s ease' }}>
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={13} className="fill-[#E2FF00] text-[#E2FF00]" />)}
          </div>
          <p className="text-white text-base font-medium leading-relaxed mb-6">"{r.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E2FF00] flex items-center justify-center">
              <span className="text-black text-xs font-black">{r.avatar}</span>
            </div>
            <div>
              <p className="font-black text-sm">{r.name}</p>
              <p className="text-zinc-500 text-xs">{r.role}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center active:scale-95 transition-transform"><ChevronLeft size={18} /></button>
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-[#E2FF00]' : 'w-2 h-2 bg-white/20'}`} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center active:scale-95 transition-transform"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

// ── Netlify Contact Form ──
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    affiliation: '',         // 학교(학년) 또는 직장
    affiliationType: 'school', // 'school' | 'work'
    grade: '',               // 학년 (school일 때만)
    codingLevel: '',
    motivation: '',
    interest: '시스템 아키텍처 1대1 과외',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Netlify Forms는 application/x-www-form-urlencoded 형식으로 전송
    const encode = (data) =>
      Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    const payload = {
      'form-name': 'vibe-coding-application',
      ...formData,
      // 학교/직장 최종값 정리
      affiliation: formData.affiliationType === 'school'
        ? `${formData.affiliation} ${formData.grade}학년`
        : formData.affiliation,
    };

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E2FF00]/30 bg-zinc-900/60 p-10 flex flex-col items-center text-center gap-4"
        style={{ animation: 'fadeIn 0.4s ease' }}>
        <div className="w-14 h-14 rounded-full bg-[#E2FF00] flex items-center justify-center mb-2">
          <CheckCircle2 size={28} className="text-black" />
        </div>
        <h3 className="text-xl font-black tracking-tight">신청이 완료됐습니다!</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">빠른 시일 내에 연락드리겠습니다.<br />카카오톡 또는 전화로 연락 주셔도 됩니다.</p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ name:'',phone:'',email:'',location:'',affiliation:'',affiliationType:'school',grade:'',codingLevel:'',motivation:'',interest:'시스템 아키텍처 1대1 과외',message:'' }); }}
          className="mt-2 px-6 py-2.5 rounded-xl border border-white/15 text-xs font-black uppercase tracking-widest hover:border-[#E2FF00]/40 transition-all">
          다시 작성하기
        </button>
      </div>
    );
  }

  const inputBase = "w-full bg-transparent text-base font-bold outline-none placeholder:text-zinc-700 text-white";
  const labelBase = "text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 block";

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Netlify Forms 필수 hidden 필드 */}
        <input type="hidden" name="form-name" value="vibe-coding-application" />
        {/* Honeypot anti-spam (숨김) */}
        <p style={{ display: 'none' }}>
          <label>봇 필드: <input name="bot-field" onChange={() => {}} /></label>
        </p>

        <div className="space-y-0 rounded-2xl border border-white/8 bg-zinc-900/30 overflow-hidden">

          {/* 성함 */}
          <div className="px-5 py-4">
            <label className={labelBase}>성함 *</label>
            <input
              type="text" name="name" required
              placeholder="이름을 입력해주세요"
              value={formData.name} onChange={handle}
              className={inputBase} />
          </div>

          {/* 전화번호 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>전화번호 *</label>
            <input
              type="tel" name="phone" required
              placeholder="010-0000-0000"
              value={formData.phone} onChange={handle}
              className={inputBase} />
          </div>

          {/* 이메일 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>이메일</label>
            <input
              type="email" name="email"
              placeholder="example@email.com"
              value={formData.email} onChange={handle}
              className={inputBase} />
          </div>

          {/* 거주지 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>거주지 *</label>
            <input
              type="text" name="location" required
              placeholder="예: 서울 강남구, 경기 성남시"
              value={formData.location} onChange={handle}
              className={inputBase} />
          </div>

          {/* 학교 / 직장 토글 + 입력 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>학교 / 직장 *</label>
            {/* 타입 선택 탭 */}
            <div className="flex gap-2 mb-3 p-1 bg-zinc-800 rounded-xl">
              {[{ val: 'school', label: '학교' }, { val: 'work', label: '직장' }].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, affiliationType: val, grade: '' }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all duration-200 ${formData.affiliationType === val ? 'bg-[#E2FF00] text-black' : 'text-zinc-500 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>

            {formData.affiliationType === 'school' ? (
              <div className="flex gap-2">
                <input
                  type="text" name="affiliation" required
                  placeholder="학교명 (예: 서울대학교)"
                  value={formData.affiliation} onChange={handle}
                  className={`${inputBase} flex-1`} />
                <select
                  name="grade"
                  value={formData.grade} onChange={handle}
                  className="bg-zinc-800 text-white text-sm font-bold rounded-lg px-3 outline-none border border-white/10 cursor-pointer flex-shrink-0">
                  <option value="">학년</option>
                  {[1,2,3,4,'졸업','재수','고1','고2','고3'].map(g => (
                    <option key={g} value={g} className="bg-zinc-900">{g}{typeof g === 'number' ? '학년' : ''}</option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                type="text" name="affiliation" required
                placeholder="회사명 및 직무 (예: 삼성전자 마케팅)"
                value={formData.affiliation} onChange={handle}
                className={inputBase} />
            )}
          </div>

          {/* 코딩 실력 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>코딩 실력 *</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { val: 'beginner', label: '🌱 완전 입문', sub: '코딩 경험 없음' },
                { val: 'basic', label: '📗 기초', sub: '기본 문법 학습 중' },
                { val: 'intermediate', label: '🔥 중급', sub: '프로젝트 경험 있음' },
                { val: 'advanced', label: '⚡ 고급', sub: '실무 경험 보유' },
              ].map(({ val, label, sub }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, codingLevel: val }))}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${formData.codingLevel === val ? 'border-[#E2FF00] bg-[#E2FF00]/10' : 'border-white/10 bg-zinc-800/50 hover:border-white/25'}`}>
                  <div className="text-sm font-black mb-0.5">{label}</div>
                  <div className="text-zinc-500 text-[10px]">{sub}</div>
                </button>
              ))}
            </div>
            {/* hidden input for form submission */}
            <input type="hidden" name="codingLevel" value={formData.codingLevel} />
          </div>

          {/* 관심 분야 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>관심 분야 *</label>
            <select
              name="interest"
              value={formData.interest} onChange={handle}
              className="w-full bg-transparent text-base font-bold outline-none appearance-none cursor-pointer text-white">
              <option className="bg-zinc-900">시스템 아키텍처 1대1 과외</option>
              <option className="bg-zinc-900">프론트엔드 1대1 과외</option>
              <option className="bg-zinc-900">취업 준비 1대1 과외</option>
            </select>
          </div>

          {/* 지원 동기 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>지원 동기 *</label>
            <textarea
              name="motivation" required
              placeholder="바이브 코딩에 지원하게 된 동기와 목표를 자유롭게 적어주세요."
              value={formData.motivation} onChange={handle}
              className={`${inputBase} resize-none`}
              rows={3} />
          </div>

          {/* 추가 문의 */}
          <div className="px-5 py-4 border-t border-white/5">
            <label className={labelBase}>추가 문의 사항</label>
            <textarea
              name="message"
              placeholder="기타 궁금한 점을 자유롭게 적어주세요."
              value={formData.message} onChange={handle}
              className={`${inputBase} resize-none`}
              rows={2} />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-red-400 text-xs font-bold text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || !formData.codingLevel}
          className="mt-4 w-full bg-[#E2FF00] text-black py-4 rounded-xl font-black text-base tracking-widest active:scale-[0.98] transition-all hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              제출 중...
            </>
          ) : '수업 신청하기'}
        </button>
        {!formData.codingLevel && (
          <p className="text-center text-zinc-600 text-[10px] mt-2">코딩 실력을 선택해주세요</p>
        )}
      </form>
    </>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [activeTrack, setActiveTrack] = useState('backend');

  const heroTextRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const stat0 = useRef(null);
  const stat1 = useRef(null);
  const stat2 = useRef(null);
  const programsHeadRef = useRef(null);
  const card0 = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const curriculumHeadRef = useRef(null);
  const curriculumBodyRef = useRef(null);
  const feature0 = useRef(null);
  const feature1 = useRef(null);
  const feature2 = useRef(null);
  const stepsHeadRef = useRef(null);
  const step0 = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);
  const contactHeadRef = useRef(null);
  const contactInfoRef = useRef(null);
  const contactFormRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ scrollTrigger: { trigger: heroTextRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      heroTl
        .fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo(h1Ref.current, { opacity: 0, y: 50, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out' }, '-=0.3')
        .fromTo(subtitleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      [stat0, stat1, stat2].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.13, scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' } });
      });

      gsap.fromTo(programsHeadRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: programsHeadRef.current, start: 'top 82%', toggleActions: 'play none none none' } });

      [card0, card1, card2].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.12, scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } });
      });

      gsap.fromTo(curriculumHeadRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: curriculumHeadRef.current, start: 'top 82%', toggleActions: 'play none none none' } });
      gsap.fromTo(curriculumBodyRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: curriculumBodyRef.current, start: 'top 85%', toggleActions: 'play none none none' } });

      [feature0, feature1, feature2].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, scale: 0.92, y: 32 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)', delay: i * 0.12, scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } });
      });

      gsap.fromTo(stepsHeadRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: stepsHeadRef.current, start: 'top 82%', toggleActions: 'play none none none' } });

      [step0, step1, step2, step3].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, x: -44 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.14, scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } });
      });

      [{ ref: contactHeadRef, y: 36, delay: 0 }, { ref: contactInfoRef, y: 24, delay: 0.1 }, { ref: contactFormRef, y: 24, delay: 0.2 }].forEach(({ ref, y, delay }) => {
        gsap.fromTo(ref.current, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay, scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } });
      });
    });
    return () => ctx.revert();
  }, []);

  const navItems = [
    { name: '프로그램', href: '#programs' },
    { name: '커리큘럼', href: '#curriculum' },
    { name: '후기', href: '#reviews' },
    { name: '문의', href: '#contact' },
  ];

  const activeTrackData = curriculumTracks.find(t => t.id === activeTrack);

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {showReviews && <ReviewModal onClose={() => setShowReviews(false)} />}

      {/* ── Nav ── */}
      <nav className={`fixed w-full z-50 transition-all duration-400 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/8 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-lg mx-auto px-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E2FF00] flex items-center justify-center rounded-lg">
              <Code className="text-black w-4 h-4" />
            </div>
            <span className="text-base font-black tracking-tighter uppercase italic">VIBE CODING</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="w-8 h-8 flex items-center justify-center relative z-50">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-all duration-400 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navItems.map((item, i) => (
          <a key={item.name} href={item.href}
            className="text-3xl font-black italic tracking-tighter hover:text-[#E2FF00] transition-colors"
            style={{
              transitionDelay: `${i * 60}ms`,
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease, color 0.2s'
            }}
            onClick={() => setIsMenuOpen(false)}>
            {item.name}
          </a>
        ))}
        <a href="#contact" onClick={() => setIsMenuOpen(false)}
          className="mt-4 bg-[#E2FF00] text-black px-8 py-3 rounded-full font-black text-sm tracking-widest">
          수업 신청
        </a>
      </div>

      {/* ── Hero: Spline 3D ── */}
      <section style={{ height: '100svh', minHeight: 640 }} className="relative overflow-hidden">
        <Spline scene="https://prod.spline.design/qDUvIv15ar8XI-Jx/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ animation: 'fadeUp 1s ease 1s both' }}>
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#E2FF00]/60 to-transparent" />
        </div>
      </section>

      {/* ── Hero Text & CTA ── */}
      <section ref={heroTextRef} className="relative flex flex-col items-center overflow-hidden bg-black py-28">
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#E2FF00 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="relative z-10 px-5 text-center flex flex-col items-center">
          <div ref={badgeRef} style={{ opacity: 0 }} className="mb-6 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#E2FF00] rounded-full" style={{ animation: 'ping 1.5s infinite' }} />
            <span className="text-[#E2FF00] text-[9px] font-black tracking-[0.35em] uppercase">1대1 바이브 코딩 과외</span>
          </div>
          <h1 ref={h1Ref} className="font-black tracking-tighter leading-[0.85] mb-6 select-none" style={{ fontSize: 'clamp(64px, 22vw, 120px)', opacity: 0 }}>
            VIBE<br /><span className="text-[#E2FF00] italic">CODE.</span>
          </h1>
          <p ref={subtitleRef} style={{ opacity: 0 }} className="text-zinc-400 text-sm font-medium mb-10 max-w-xs leading-relaxed">
            현직 개발자가 당신만을 위한<br />1대1 맞춤 과외를 진행합니다.
          </p>
          <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col gap-3 w-full max-w-xs">
            <a href="#contact" className="bg-[#E2FF00] text-black py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 group active:scale-95 transition-transform">
              1대1 수업 신청 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => setShowReviews(true)} className="border border-white/15 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform">
              수강생 후기 보기 <Play size={15} className="fill-[#E2FF00] text-[#E2FF00]" />
            </button>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Stats ── */}
      <section className="py-16 px-5 bg-zinc-950">
        <div className="max-w-lg mx-auto">
          {[
            { ref: stat0, value: '700+', label: 'Success Stories', sub: '대기업·글로벌 스타트업 합격' },
            { ref: stat1, value: '2,500+', label: '1대1 수업', sub: '현직 개발자 밀착 1대1 과외' },
            { ref: stat2, value: '98.4%', label: 'Satisfaction Rate', sub: '수강생이 먼저 추천하는 수업' },
          ].map(({ ref, value, label, sub }) => (
            <div key={label} ref={ref} style={{ opacity: 0 }} className="flex items-center justify-between py-6 border-b border-white/5">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-zinc-400 text-sm">{sub}</p>
              </div>
              <span className="text-4xl font-black text-[#E2FF00] tracking-tighter italic">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Programs ── */}
      <section id="programs" className="py-20 px-5 bg-black">
        <div className="max-w-lg mx-auto">
          <div ref={programsHeadRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#E2FF00]" />
              <span className="text-[#E2FF00] text-[10px] font-black tracking-[0.4em] uppercase">1대1 과외 과정</span>
            </div>
            <h2 className="font-black tracking-tighter mb-16 leading-none" style={{ fontSize: 'clamp(36px, 11vw, 52px)' }}>
              LIMITLESS<br />GROWTH.
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { ref: card0, icon: <Layers size={20} />, label: 'Backend', title: '시스템 아키텍처', desc: '고가용성 대용량 트래픽 처리를 위한 인프라 및 DB 설계를 1대1로 배웁니다.' },
              { ref: card1, icon: <Smartphone size={20} />, label: 'Frontend', title: '인터랙티브 프론트', desc: '모던 프레임워크와 애니메이션 인터랙션을 1대1 과외로 마스터하세요.' },
              { ref: card2, icon: <Cpu size={20} />, label: 'Career', title: '취업 집중 과외', desc: '포트폴리오 제작부터 기술 면접까지 1대1로 전략적으로 준비합니다.' },
            ].map((card, i) => (
              <div key={i} ref={card.ref} style={{ opacity: 0 }}
                className="group p-6 rounded-2xl border border-white/8 bg-zinc-900/30 hover:border-[#E2FF00]/30 hover:bg-zinc-900/60 transition-all duration-300 active:scale-[0.98]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E2FF00] group-hover:text-black transition-all duration-300">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{card.label}</span>
                    <h3 className="text-lg font-black tracking-tight mt-0.5 mb-2">{card.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-zinc-700 group-hover:text-[#E2FF00] flex-shrink-0 mt-1 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Marquee ── */}
      <section className="bg-[#E2FF00] py-5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex items-center gap-8 px-6">
              <span className="text-4xl font-black text-black tracking-tighter italic uppercase select-none">Vibe Coding</span>
              <Zap className="text-black fill-black flex-shrink-0" size={20} />
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-20 px-5 bg-black">
        <div className="max-w-lg mx-auto">
          <div ref={curriculumHeadRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#E2FF00]" />
              <span className="text-[#E2FF00] text-[10px] font-black tracking-[0.4em] uppercase">Curriculum</span>
            </div>
            <h2 className="font-black tracking-tighter mb-3 leading-none" style={{ fontSize: 'clamp(36px, 11vw, 52px)' }}>
              12주<br />커리큘럼.
            </h2>
            <p className="text-zinc-500 text-sm mb-10">트랙을 선택하면 주차별 상세 내용을 확인할 수 있습니다.</p>
            <div className="flex gap-2 mb-10 p-1 bg-zinc-900 rounded-2xl">
              {curriculumTracks.map(track => (
                <button key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${activeTrack === track.id ? 'bg-[#E2FF00] text-black' : 'text-zinc-500 hover:text-white'}`}>
                  {track.icon}
                  {track.label}
                </button>
              ))}
            </div>
          </div>
          <div ref={curriculumBodyRef} style={{ opacity: 0 }} className="space-y-3">
            {activeTrackData.weeks.map((w, i) => (
              <div key={`${activeTrack}-${i}`} className="rounded-2xl border border-white/8 bg-zinc-900/30 overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/5">
                  <span className="text-[10px] font-black text-[#E2FF00] tracking-widest bg-[#E2FF00]/10 px-2.5 py-1 rounded-lg flex-shrink-0">{w.week}</span>
                  <p className="font-black text-sm">{w.title}</p>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                  {w.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-[#E2FF00] flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <a href="#contact"
              className="mt-2 flex items-center justify-center gap-2 w-full bg-[#E2FF00] text-black py-4 rounded-xl font-black text-sm tracking-widest active:scale-[0.98] transition-transform hover:bg-white">
              이 트랙으로 신청하기 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Why Vibe Feature Cards ── */}
      <section className="py-20 px-5 bg-zinc-950">
        <div className="max-w-lg mx-auto space-y-4">
          <div ref={feature0} style={{ opacity: 0 }} className="rounded-2xl border border-white/8 bg-zinc-900/50 p-7 overflow-hidden relative">
            <div className="absolute -right-8 -bottom-8 opacity-[0.04]"><Code size={180} /></div>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Why Vibe</span>
            <h3 className="text-2xl font-black mt-2 mb-3 leading-snug">현직 개발자가<br />1대1로 당신을 가르칩니다.</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">현직 빅테크 시니어 개발자가 당신의 코드를 직접 보며 1대1 과외로 실력을 끌어올립니다.</p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-black text-xs tracking-widest uppercase hover:bg-[#E2FF00] transition-colors">
              수업 신청하기 <ArrowRight size={14} />
            </a>
          </div>
          <div ref={feature1} style={{ opacity: 0 }} className="rounded-2xl bg-[#E2FF00] p-7 text-black">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-[#E2FF00] mb-4">
              <MessageSquare size={20} fill="currentColor" />
            </div>
            <h4 className="text-xl font-black mb-2 leading-snug">실시간<br />1대1 질문 답변</h4>
            <p className="text-black/60 text-sm leading-relaxed">24시간 이내 현직 개발자 답변.<br />언제든 질문하세요.</p>
          </div>
          <div ref={feature2} style={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-4">
              {[{ value: '1:1', label: '개인 맞춤 과외' }, { value: 'Live', label: '실시간 코드 리뷰' }].map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-zinc-900/30 p-5 text-center">
                  <div className="text-2xl font-black text-[#E2FF00] mb-1">{value}</div>
                  <div className="text-zinc-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Steps ── */}
      <section className="py-20 px-5 bg-black">
        <div className="max-w-lg mx-auto">
          <div ref={stepsHeadRef} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#E2FF00]" />
              <span className="text-[#E2FF00] text-[10px] font-black tracking-[0.4em] uppercase">Process</span>
            </div>
            <h2 className="font-black tracking-tighter mb-12 leading-none" style={{ fontSize: 'clamp(32px, 10vw, 48px)' }}>
              4단계<br />1대1 과외 과정
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { ref: step0, num: '01', title: '첫 수업 상담', desc: '현재 수준과 목표를 파악하고 맞춤 커리큘럼을 설계합니다.' },
              { ref: step1, num: '02', title: '수준 파악', desc: '기술 스택과 약점을 분석하여 집중할 부분을 정합니다.' },
              { ref: step2, num: '03', title: '1대1 과외 진행', desc: '나만을 위한 커리큘럼으로 1대1 맞춤 수업을 진행합니다.' },
              { ref: step3, num: '04', title: '취업 완성', desc: '포트폴리오 완성 및 취업을 함께 준비합니다.' },
            ].map((step) => (
              <div key={step.num} ref={step.ref} style={{ opacity: 0 }}
                className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 hover:border-[#E2FF00]/30 hover:bg-zinc-900/40 transition-all duration-300">
                <span className="text-2xl font-black text-zinc-800 group-hover:text-[#E2FF00] transition-colors w-10 flex-shrink-0">{step.num}</span>
                <div>
                  <p className="font-black text-base mb-0.5">{step.title}</p>
                  <p className="text-zinc-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Reviews ── */}
      <section id="reviews" className="py-20 px-5 bg-zinc-950">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#E2FF00]" />
            <span className="text-[#E2FF00] text-[10px] font-black tracking-[0.4em] uppercase">Reviews</span>
          </div>
          <h2 className="font-black tracking-tighter mb-10 leading-none" style={{ fontSize: 'clamp(32px, 10vw, 48px)' }}>
            수강생<br />후기
          </h2>
          <div className="space-y-4">
            {reviews.slice(0, 3).map((r, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/8 bg-zinc-900/30">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={12} className="fill-[#E2FF00] text-[#E2FF00]" />)}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E2FF00] flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-[10px] font-black">{r.avatar}</span>
                  </div>
                  <div>
                    <p className="font-black text-sm">{r.name}</p>
                    <p className="text-zinc-600 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowReviews(true)}
            className="mt-6 w-full border border-white/15 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:border-[#E2FF00]/40 transition-all active:scale-[0.98]">
            후기 더 보기 <ArrowRight size={16} className="text-[#E2FF00]" />
          </button>
        </div>
      </section>

      <Divider />

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-5 bg-black">
        <div className="max-w-lg mx-auto">
          <div ref={contactHeadRef} style={{ opacity: 0 }}>
            <h2 className="font-black tracking-tighter mb-2 leading-none" style={{ fontSize: 'clamp(36px, 11vw, 52px)' }}>
              START YOUR<br /><span className="text-[#E2FF00]">VIBE NOW.</span>
            </h2>
            <p className="text-zinc-500 text-sm mb-10">지금 바로 1대1 수업을 신청하세요.</p>
          </div>
          <div ref={contactInfoRef} style={{ opacity: 0 }} className="space-y-3 mb-8">
            {[
              { icon: <Smartphone size={18} />, label: 'Phone', value: '010.0000.2640' },
              { icon: <MessageSquare size={18} />, label: 'KakaoTalk', value: '@바이브코딩' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-zinc-900/30">
                <div className="w-9 h-9 bg-[#E2FF00] rounded-lg flex items-center justify-center text-black flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
                  <p className="font-black text-base">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Netlify Form ── */}
          <div ref={contactFormRef} style={{ opacity: 0 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Footer ── */}
      <footer className="py-12 px-5 bg-black">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#E2FF00] flex items-center justify-center rounded-lg">
              <Code className="text-black w-4 h-4" />
            </div>
            <span className="text-base font-black tracking-tighter uppercase italic">VIBE CODING</span>
          </div>
          <div className="flex gap-8 mb-8">
            {['Instagram', 'Youtube', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-[#E2FF00] transition-colors">{s}</a>
            ))}
          </div>
          <p className="text-zinc-700 text-[10px] leading-loose">
            서울특별시 강남구 테헤란로<br />
            contact@vibecoding.com<br />
            © 2024 VIBE CODING. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.5); } }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.8s linear infinite; }
        ::selection { background: #E2FF00; color: black; }
        html { scroll-behavior: smooth; }
        body { background: black; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #E2FF00; }
      `}</style>
    </div>
  );
};

export default App;