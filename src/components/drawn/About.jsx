import React, { useRef } from 'react';
import { useDraw } from './Drawn';
import { Note, useTerms } from './Terms';
import { href } from '../../config';
import { projects } from '../../data/projects';

const APM_REPO = projects[0].url;

// Definitions shown in the note under the About text while their term is hovered, focused or tapped.
const DEFS = {
  hci: 'Human-Computer Interaction: the study of how people use computers, and how to design software around them.',
  haci: 'Human-Agent-Computer Interaction: HCI with a third party. With AI agents in the loop there are three relationships to design for: human and computer, human and agent, agent and computer.',
};

export default function About() {
  const draw = useDraw('about');
  const { active, ref, props } = useTerms();
  const last = useRef('hci');
  if (active) last.current = active;
  const term = (key, text) => <button type="button" className="term" aria-controls="about-note" {...props(key)}>{text}</button>;
  return (
    <div className="prose" ref={ref}>
      <p>
        Hello. I’m a software engineer particularly interested in how humans work with computers ({term('hci', 'HCI')}),
        and lately in how they work with AI agents too ({term('haci', 'HACI')}). Most of what I like to build floats
        around these areas.
      </p>
      <p>
        My main side project is <a href={APM_REPO}>APM</a>, an open-source framework for AI-assisted software engineering,
        where multiple AI agents work together as a team in a spec-driven workflow. It is designed to preserve the
        user’s agency and authority over the software being built. I started it during my undergraduate studies, and
        it has since gained some traction in the open-source community. APM also became the subject of my BSc thesis,
        where we designed a reproducible methodology for evaluating frameworks of its kind and applied it in a case study
        with twelve developers.
      </p>
      <p>
        Currently, I’m working on a project to modernize and extend a proprietary suite of business software (CRM,
        warehouse management, order processing, etc.). So far, that mostly means untangling a lot of legacy code.
      </p>
      <p>
        Here I share <a href={href('projects/')}>projects</a> I’m proud of, from APM to a few small tools I built for
        my own work, and <a href={href('research/')}>research</a> I’ve authored or contributed to. I also publish my
        {' '}<a href={href('writing/')}>writing</a> on software, AI, and whatever else holds my attention.
      </p>
      {/* Every definition sits in one grid cell, so the note keeps the height of the longest and nothing shifts. */}
      <Note id="about-note" active={!!active} wave={draw?.note}>
        <span className="note-stack">
          {Object.entries(DEFS).map(([key, text]) => (
            <span key={key} style={{ visibility: key === last.current ? 'visible' : 'hidden' }}>{text}</span>
          ))}
        </span>
      </Note>
    </div>
  );
}
