// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, MapPin, Phone, Mail, Facebook,
  Twitter, Instagram, Linkedin, ArrowUpRight,
  ChevronRight
} from 'lucide-react';

const LINKS = {
  pages: [
    { label:'Home',          to:'/'            },
    { label:'About',         to:'/about'       },
    { label:'Courses',       to:'/course'      },
    { label:'Gallery',       to:'/gallery'     },
    { label:'Our Team',      to:'/ourteam'     },
    { label:'Contact',       to:'/contact'     },
  ],
  membership: [
    { label:'Become a Member', to:'/becomeamember' },
    { label:'Membership Plans',to:'/membership'    },
    { label:'Member Login',    to:'/login'          },
    { label:'My Dashboard',    to:'/user/dashboard' },
  ],
};

const SOCIALS = [
  { icon:Facebook,  href:'https://facebook.com',  label:'Facebook'  },
  { icon:Twitter,   href:'https://twitter.com',   label:'Twitter'   },
  { icon:Instagram, href:'https://instagram.com', label:'Instagram' },
  { icon:Linkedin,  href:'https://linkedin.com',  label:'LinkedIn'  },
];

const BRANCHES = [
  { name:'Colombo 7',  address:'Maitland Crescent',  phone:'011-269-5331' },
  { name:'Moors',      address:'Moors Sports Club',   phone:'011-212-1755' },
  { name:'Ja Ela',     address:'Ja-ela',              phone:'011-222-9747' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800/60 text-white">

      {/* ── CTA strip ── */}
      <div className="border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row
          items-center justify-between gap-6">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">
              Start Today
            </p>
            <h3 className="text-2xl font-black uppercase">
              Ready to Transform Your Life?
            </h3>
          </div>
          <Link
            to="/becomeamember"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white
              font-bold px-7 py-4 rounded-xl text-sm uppercase tracking-wider
              transition-all hover:scale-[1.02] shadow-lg shadow-red-900/30 flex-shrink-0"
          >
            Join FitTrack <ArrowUpRight size={16}/>
          </Link>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center
                shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <p className="text-white font-black text-lg uppercase leading-none tracking-wider">
                  FitTrack
                </p>
                <p className="text-gray-600 text-[9px] uppercase tracking-[0.25em] mt-0.5">
                  Gym & Fitness
                </p>
              </div>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Sri Lanka's premier fitness destination. Transform your body, elevate your mind,
              and join a community that pushes limits.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-xl
                    flex items-center justify-center text-gray-500
                    hover:border-red-600/50 hover:bg-red-600/10 hover:text-red-500
                    transition-all duration-200"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Pages ── */}
          <div>
            <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold mb-5">
              Pages
            </p>
            <ul className="space-y-2.5">
              {LINKS.pages.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-2 text-gray-500 hover:text-white
                      text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-gray-800 group-hover:text-red-500 transition-colors flex-shrink-0"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Membership ── */}
          <div>
            <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold mb-5">
              Membership
            </p>
            <ul className="space-y-2.5">
              {LINKS.membership.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-2 text-gray-500 hover:text-white
                      text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-gray-800 group-hover:text-red-500 transition-colors flex-shrink-0"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Email */}
            <div className="mt-8">
              <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold mb-3">
                Email
              </p>
              <a href="mailto:fitnessfirstcolombo@gmail.com"
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors group">
                <Mail size={13} className="text-gray-700 group-hover:text-red-500 transition-colors flex-shrink-0" />
                fitnessfirstcolombo@gmail.com
              </a>
            </div>
          </div>

          {/* ── Branches ── */}
          <div>
            <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold mb-5">
              Our Branches
            </p>
            <div className="space-y-5">
              {BRANCHES.map((b, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                    <p className="text-white text-sm font-bold">{b.name}</p>
                  </div>
                  <div className="pl-3.5 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin size={11} className="text-gray-700 flex-shrink-0" />
                      <p className="text-gray-600 text-xs">{b.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={11} className="text-gray-700 flex-shrink-0" />
                      <a href={`tel:${b.phone}`}
                        className="text-gray-600 hover:text-white text-xs transition-colors">
                        {b.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row
          items-center justify-between gap-3">
          <p className="text-gray-700 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} FitTrack Gym. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <p className="text-gray-700 text-xs uppercase tracking-widest">
              Sri Lanka's #1 Fitness Brand
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}