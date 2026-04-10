'use client';

import { User } from '../../lib/mockapi';

export const NAME_FILTER_TABS = [
  'すべて',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
  'A〜Z',
  '0〜9',
  'その他',
  '名前なし',
] as const;

export type NameFilterTab = (typeof NAME_FILTER_TABS)[number];
type GojuonRowKey = 'ア' | 'カ' | 'サ' | 'タ' | 'ナ' | 'ハ' | 'マ' | 'ヤ' | 'ラ' | 'ワ';

// ふりがなの先頭（ひらがな）から、どの行（ア/カ/サ/...）に属するかを判定する
const ROW_KEY_BY_HIRAGANA_INITIAL: Record<string, GojuonRowKey> = {
  // ア行
  あ: 'ア',
  い: 'ア',
  う: 'ア',
  え: 'ア',
  お: 'ア',
  // カ行
  か: 'カ',
  き: 'カ',
  く: 'カ',
  け: 'カ',
  こ: 'カ',
  が: 'カ',
  ぎ: 'カ',
  ぐ: 'カ',
  げ: 'カ',
  ご: 'カ',
  // サ行
  さ: 'サ',
  し: 'サ',
  す: 'サ',
  せ: 'サ',
  そ: 'サ',
  ざ: 'サ',
  じ: 'サ',
  ず: 'サ',
  ぜ: 'サ',
  ぞ: 'サ',
  // タ行
  た: 'タ',
  ち: 'タ',
  つ: 'タ',
  て: 'タ',
  と: 'タ',
  だ: 'タ',
  ぢ: 'タ',
  づ: 'タ',
  で: 'タ',
  ど: 'タ',
  // ナ行
  な: 'ナ',
  に: 'ナ',
  ぬ: 'ナ',
  ね: 'ナ',
  の: 'ナ',
  // ハ行
  は: 'ハ',
  ひ: 'ハ',
  ふ: 'ハ',
  へ: 'ハ',
  ほ: 'ハ',
  ば: 'ハ',
  び: 'ハ',
  ぶ: 'ハ',
  べ: 'ハ',
  ぼ: 'ハ',
  ぱ: 'ハ',
  ぴ: 'ハ',
  ぷ: 'ハ',
  ぺ: 'ハ',
  ぽ: 'ハ',
  // マ行
  ま: 'マ',
  み: 'マ',
  む: 'マ',
  め: 'マ',
  も: 'マ',
  // ヤ行
  や: 'ヤ',
  ゆ: 'ヤ',
  よ: 'ヤ',
  ゃ: 'ヤ',
  ゅ: 'ヤ',
  ょ: 'ヤ',
  // ラ行
  ら: 'ラ',
  り: 'ラ',
  る: 'ラ',
  れ: 'ラ',
  ろ: 'ラ',
  // ワ行
  わ: 'ワ',
  を: 'ワ',
  ゎ: 'ワ',
  ゐ: 'ワ',
  ゑ: 'ワ',
};

export function katakanaToHiragana(input: string): string {
  // Unicode の 30A1-30F6 は 3041-3096 と 0x60 のオフセットで対応
  return input.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60),
  );
}

function looksLikeKanaInitial(s: string): boolean {
  const t = s.trim();
  return /^[ぁ-んァ-ンゔ]/.test(t);
}

function getFirstKanaLikeChar(input: string): string | null {
  const normalized = katakanaToHiragana(input.trim());
  const chars = Array.from(normalized);
  for (const ch of chars) {
    if (ch === 'ー' || ch === 'っ' || ch === '・') continue; // 先頭の記号/促音は無視
    return ch;
  }
  return null;
}

export function getUserNameFilterGroup(u: User): NameFilterTab {
  const isNameMissing =
    !u.last_name && !u.first_name && !u.last_name_okurikana && !u.first_name_okurikana;
  if (isNameMissing) return '名前なし';

  // ふりがな（okurikana）優先。無い場合は名前がカナ文字列のときだけ対応する
  let readingCandidate = '';
  if (u.last_name_okurikana) readingCandidate = u.last_name_okurikana;
  else if (u.last_name && looksLikeKanaInitial(u.last_name)) readingCandidate = u.last_name;
  else if (u.first_name_okurikana) readingCandidate = u.first_name_okurikana;
  else if (u.first_name && looksLikeKanaInitial(u.first_name)) readingCandidate = u.first_name;

  const trimmed = readingCandidate.trim();
  if (!trimmed) return 'その他';

  const firstChar = trimmed[0];
  if (/[A-Za-z]/.test(firstChar)) return 'A〜Z';
  if (/[0-9]/.test(firstChar)) return '0〜9';

  const initial = getFirstKanaLikeChar(trimmed);
  if (!initial) return 'その他';

  const mappedRow = ROW_KEY_BY_HIRAGANA_INITIAL[initial];
  return mappedRow ? (mappedRow as NameFilterTab) : 'その他';
}

function digitsOnly(input: string): string {
  return input.replace(/\D/g, '');
}

export function doesUserMatchSearch(u: User, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const compactQuery = trimmed.replace(/\s+/g, '');
  const queryLower = trimmed.toLowerCase();
  const queryKana = katakanaToHiragana(compactQuery);
  const queryDigits = digitsOnly(compactQuery);

  const email = (u.email ?? '').trim().toLowerCase();
  if (email && email.includes(queryLower)) return true;

  const telephone = u.telephone_number ?? '';
  if (queryDigits) {
    const telDigits = digitsOnly(telephone);
    if (telDigits && telDigits.includes(queryDigits)) return true;
  }
  if (telephone && String(telephone).includes(trimmed)) return true;

  const last = (u.last_name ?? '').replace(/\s+/g, '');
  if (last && last.includes(compactQuery)) return true;

  const first = (u.first_name ?? '').replace(/\s+/g, '');
  if (first && first.includes(compactQuery)) return true;

  const full = [last, first].filter(Boolean).join('');
  if (full && full.includes(compactQuery)) return true;

  const lastReading = katakanaToHiragana((u.last_name_okurikana ?? '').replace(/\s+/g, ''));
  if (lastReading && lastReading.includes(queryKana)) return true;

  const firstReading = katakanaToHiragana((u.first_name_okurikana ?? '').replace(/\s+/g, ''));
  if (firstReading && firstReading.includes(queryKana)) return true;

  return false;
}

export function NameFilterTabs({
  selected,
  onChange,
}: {
  selected: NameFilterTab;
  onChange: (tab: NameFilterTab) => void;
}) {
  return (
    <>
      {NAME_FILTER_TABS.map((t) => {
        const isActive = selected === t;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(t)}
            className={[
              'hover:text-gray-700',
              isActive ? 'text-green-700 font-bold' : '',
            ].join(' ')}
          >
            {t}
          </button>
        );
      })}
    </>
  );
}

