// Den lodrette evalueringsbjælke ved siden af skakbrættet på /play-siden.
// Viser visuelt, hvem motoren mener står bedst: mere hvidt areal = bedre
// for hvid, mere mørkt areal = bedre for sort.
import styled from "styled-components";

interface EloBarProps {
  whiteEvalCp: number | null; // motorens vurdering i centipawns, set fra hvids side
  mate: number | null; // positivt = hvid matter, negativt = sort matter
}

const Bar = styled.div`
  width: 32px;
  height: 440px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  background: #2b2b2b;
`;

const WhitePortion = styled.div<{ $percent: number }>`
  background: #f1efe9;
  height: ${(p) => p.$percent}%;
  transition: height 0.4s ease;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textDim};
  text-align: center;
`;

// Omregner motorens vurdering til en procentdel (0-100) af bjælken, der
// skal være hvid. Ved mat vises bjælken helt fyldt ud til den vindende
// side; ellers afgrænses (clamp'es) vurderingen til +/-10 bønder, så en
// enkelt stor føring ikke fylder hele bjælken.
function evalToPercent(cp: number | null, mate: number | null): number {
  if (mate !== null) return mate > 0 ? 100 : 0;
  if (cp === null) return 50;
  const clamped = Math.max(-1000, Math.min(1000, cp));
  return 50 + clamped / 20; // -1000..1000 -> 0..100
}

export default function EloBar({ whiteEvalCp, mate }: EloBarProps) {
  const percent = evalToPercent(whiteEvalCp, mate);
  // Teksten under bjælken: enten "Mate in N", eller vurderingen omregnet
  // fra centipawns til hele bønder (f.eks. "+1.3"), eller "..." mens vi
  // venter på motorens første vurdering.
  const label = mate
    ? `Mate in ${Math.abs(mate)}`
    : whiteEvalCp === null
    ? "..."
    : `${whiteEvalCp > 0 ? "+" : ""}${(whiteEvalCp / 100).toFixed(1)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "center" }}>
      <Bar>
        <div style={{ flex: 1 }} />
        <WhitePortion $percent={percent} />
      </Bar>
      <Label>{label}</Label>
    </div>
  );
}
