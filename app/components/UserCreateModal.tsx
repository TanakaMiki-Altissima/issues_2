'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faCalendarDays,
  faSquare,
  faUser,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { type UserCreateInput } from '../../lib/mockapi';

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (input: UserCreateInput) => void | Promise<void>;
}

function SectionTile({
  title,
  children,
  bodyClassName = 'space-y-3',
}: {
  title: string;
  children: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className="rounded-lg border border-gray-100 bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
      <h3 className="mb-3 inline-flex items-center gap-2 text-lg font-bold text-green-700">
        <FontAwesomeIcon icon={faSquare} className="text-green-700" />
        <span>{title}</span>
      </h3>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/** 基本情報タイル右端：グレー丸・右下に白背景のカメラ・下に ! */
function ProfilePhotoPlaceholder() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 self-center pt-0.5 md:mt-14 lg:self-start">
      <div className="relative">
        <div
          className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-300"
          aria-hidden
        >
          <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-500" />
        </div>
        <div
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
        >
          <FontAwesomeIcon icon={faCamera} className="text-lg text-green-600" />
        </div>
      </div>
      <span className="text-lg font-bold leading-none" aria-hidden>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-lg font-bold leading-none text-red-600"
        />
      </span>
      <p className="max-w-[12rem] whitespace-pre-line break-words text-center text-[11px] leading-snug text-gray-700">
        {'プロフィール画像は\nユーザ本人でも登録可能です。\n\nアップロードの際は\n個人情報漏洩など\nセキュリティリストを\n十分に考慮してください。'}
      </p>
    </div>
  );
}

const inputClass =
  'w-full border border-gray-400 rounded-md p-2 text-gray-800 placeholder:text-gray-400';

/** プルダウン＋入力を1枠でつなげる */
const comboOuterClass = 'flex min-w-0 flex-1 overflow-hidden rounded-md border border-gray-400';
/** メール／電話で同じ幅（長いラベル「自宅用メールアドレス」に合わせる） */
const comboSelectClass =
  'shrink-0 w-[min(100%,14rem)] border-0 border-r border-gray-400 bg-gray-50 py-2 pl-2 pr-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:w-56 sm:text-sm';
const comboInputClass =
  'min-w-0 flex-1 border-0 py-2 px-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500';

type EmailRow = { kind: 'work' | 'home'; value: string };
type PhoneRow = { kind: 'mobile' | 'home'; value: string };

function formatEmailsForApi(rows: EmailRow[]): string | undefined {
  const parts = rows
    .map((r) => {
      const v = r.value.trim();
      if (!v) return null;
      const label = r.kind === 'work' ? '社用メール' : '自宅メール';
      return `${label}:${v}`;
    })
    .filter((x): x is string => x != null);
  return parts.length ? parts.join(', ') : undefined;
}

function formatPhonesForApi(rows: PhoneRow[]): string | undefined {
  const parts = rows
    .map((r) => {
      const v = r.value.trim();
      if (!v) return null;
      const label = r.kind === 'mobile' ? '携帯' : '自宅';
      return `${label}:${v}`;
    })
    .filter((x): x is string => x != null);
  return parts.length ? parts.join(', ') : undefined;
}

/** ラベル文字の右上付近に必須マーク（赤 *）を表示 */
function RequiredFieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-start gap-0.5 text-sm font-medium text-gray-700">
      {children}
      <sup className="leading-none text-red-600" aria-hidden>
        *
      </sup>
    </span>
  );
}

export function UserCreateModal({ isOpen, onClose, onConfirm }: UserCreateModalProps) {
  const [id, setid] = useState('');
  const [last_name, setlast_name] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name_okurikana, setlast_name_okurikana] = useState('');
  const [first_name_okurikana, setfirst_name_okurikana] = useState('');
  const [position, setposition] = useState('');
  const [department, setdepartment] = useState('');
  const [affiliation, setaffiliation] = useState('');
  const [joining_date, setjoining_date] = useState('');
  const [sex, setsex] = useState('');
  const [password, setpassword] = useState('');
  const [emails, setEmails] = useState<EmailRow[]>([{ kind: 'work', value: '' }]);
  const [phones, setPhones] = useState<PhoneRow[]>([{ kind: 'mobile', value: '' }]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const trimOrUndef = (s: string) => {
    const t = s.trim();
    return t === '' ? undefined : t;
  };

  useEffect(() => {
    if (!isOpen) return;
    setid('');
    setlast_name('');
    setfirst_name('');
    setlast_name_okurikana('');
    setfirst_name_okurikana('');
    setposition('');
    setdepartment('');
    setaffiliation('');
    setjoining_date('');
    setsex('');
    setpassword('');
    setEmails([{ kind: 'work', value: '' }]);
    setPhones([{ kind: 'mobile', value: '' }]);
    setError(null);
  }, [isOpen]);

  const handleSubmit = async () => {
    const employeeId = id.trim();
    if (!employeeId) {
      setError('社員IDを入力してください');
      return;
    }
    const input: UserCreateInput = {
      id: employeeId,
      last_name: trimOrUndef(last_name),
      first_name: trimOrUndef(first_name),
      last_name_okurikana: trimOrUndef(last_name_okurikana),
      first_name_okurikana: trimOrUndef(first_name_okurikana),
      position: trimOrUndef(position),
      department: trimOrUndef(department),
      affiliation: trimOrUndef(affiliation),
      joining_date: trimOrUndef(joining_date),
      sex: trimOrUndef(sex),
      password: trimOrUndef(password),
      email: formatEmailsForApi(emails),
      telephone_number: formatPhonesForApi(phones),
    };
    setError(null);
    setSubmitting(true);
    try {
      await onConfirm(input);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : '登録に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex max-h-[min(90vh,100dvh-2rem)] flex-col">
          <h2 className="ml-5 mr-6 mt-6 mb-0 flex h-12 items-center border-l-4 border-green-700 pl-4 text-2xl font-semibold text-green-700 sm:ml-4 sm:pl-3">
            新規アカウント登録
          </h2>
          <div className="space-y-4 px-6 py-4 overflow-y-auto min-h-0 flex-1">
            <SectionTile title="基本情報" bodyClassName="">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>姓</RequiredFieldLabel>
                    </label>
                    <input
                      type="text"
                      value={last_name}
                      onChange={(e) => setlast_name(e.target.value)}
                      placeholder="山田"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>姓（カナ）</RequiredFieldLabel>
                    </label>
                    <input
                      type="text"
                      value={last_name_okurikana}
                      onChange={(e) => setlast_name_okurikana(e.target.value)}
                      placeholder="ヤマダ"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>入社日</RequiredFieldLabel>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={joining_date}
                        onChange={(e) => setjoining_date(e.target.value)}
                        placeholder="年/月/日"
                        className={`${inputClass} pr-10`}
                      />
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700"
                        aria-hidden
                      >
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">社員ID</label>
                    <input
                      type="text"
                      value={id}
                      onChange={(e) => setid(e.target.value)}
                      placeholder=""
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>名</RequiredFieldLabel>
                    </label>
                    <input
                      type="text"
                      value={first_name}
                      onChange={(e) => setfirst_name(e.target.value)}
                      placeholder="太郎"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>名（カナ）</RequiredFieldLabel>
                    </label>
                    <input
                      type="text"
                      value={first_name_okurikana}
                      onChange={(e) => setfirst_name_okurikana(e.target.value)}
                      placeholder="タロウ"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>性別</RequiredFieldLabel>
                    </label>
                    <select
                      value={sex}
                      onChange={(e) => setsex(e.target.value)}
                      className={`${inputClass} bg-white`}
                    >
                      <option value="">-</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block">
                      <RequiredFieldLabel>パスワード</RequiredFieldLabel>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="password"
                      autoComplete="new-password"
                      className={inputClass}
                    />
                  </div>
                </div>

                <ProfilePhotoPlaceholder />
              </div>
            </SectionTile>

            <SectionTile title="所属情報" bodyClassName="">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
                <div className="min-w-0 flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">会社・所属</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                    placeholder="会社・所属"
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">部署</label>
                  <input
                    type="text"
                    value={affiliation}
                    onChange={(e) => setaffiliation(e.target.value)}
                    placeholder="部署"
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">役職/階級</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setposition(e.target.value)}
                    placeholder="役職/階級"
                    className={inputClass}
                  />
                </div>
              </div>
            </SectionTile>

            <SectionTile title="その他情報">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">メールアドレス</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={comboOuterClass}>
                      <select
                        value={emails[0]?.kind ?? 'work'}
                        onChange={(e) => {
                          const kind = e.target.value as EmailRow['kind'];
                          setEmails((prev) => {
                            const next = [...prev];
                            next[0] = { ...next[0], kind };
                            return next;
                          });
                        }}
                        className={comboSelectClass}
                        aria-label="メールの種類"
                      >
                        <option value="work">社用メールアドレス</option>
                        <option value="home">自宅用メールアドレス</option>
                      </select>
                      <input
                        type="email"
                        value={emails[0]?.value ?? ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          setEmails((prev) => {
                            const next = [...prev];
                            next[0] = { ...next[0], value: v };
                            return next;
                          });
                        }}
                        placeholder="name@example.com"
                        className={comboInputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEmails((prev) => [...prev, { kind: 'work', value: '' }])
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-medium leading-none text-white shadow-sm hover:bg-green-700"
                      aria-label="メールアドレスを追加"
                    >
                      +
                    </button>
                  </div>
                  {emails.slice(1).map((row, i) => (
                    <div key={i + 1} className={comboOuterClass}>
                      <select
                        value={row.kind}
                        onChange={(e) => {
                          const kind = e.target.value as EmailRow['kind'];
                          setEmails((prev) =>
                            prev.map((x, j) => (j === i + 1 ? { ...x, kind } : x)),
                          );
                        }}
                        className={comboSelectClass}
                        aria-label="メールの種類"
                      >
                        <option value="work">社用メールアドレス</option>
                        <option value="home">自宅用メールアドレス</option>
                      </select>
                      <input
                        type="email"
                        value={row.value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setEmails((prev) =>
                            prev.map((x, j) => (j === i + 1 ? { ...x, value: v } : x)),
                          );
                        }}
                        placeholder="name@example.com"
                        className={comboInputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">電話番号</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={comboOuterClass}>
                      <select
                        value={phones[0]?.kind ?? 'mobile'}
                        onChange={(e) => {
                          const kind = e.target.value as PhoneRow['kind'];
                          setPhones((prev) => {
                            const next = [...prev];
                            next[0] = { ...next[0], kind };
                            return next;
                          });
                        }}
                        className={comboSelectClass}
                        aria-label="電話の種類"
                      >
                        <option value="mobile">携帯電話</option>
                        <option value="home">自宅</option>
                      </select>
                      <input
                        type="tel"
                        value={phones[0]?.value ?? ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          setPhones((prev) => {
                            const next = [...prev];
                            next[0] = { ...next[0], value: v };
                            return next;
                          });
                        }}
                        placeholder="090-1234-5678"
                        className={comboInputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setPhones((prev) => [...prev, { kind: 'mobile', value: '' }])
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-medium leading-none text-white shadow-sm hover:bg-green-700"
                      aria-label="電話番号を追加"
                    >
                      +
                    </button>
                  </div>
                  {phones.slice(1).map((row, i) => (
                    <div key={i + 1} className={comboOuterClass}>
                      <select
                        value={row.kind}
                        onChange={(e) => {
                          const kind = e.target.value as PhoneRow['kind'];
                          setPhones((prev) =>
                            prev.map((x, j) => (j === i + 1 ? { ...x, kind } : x)),
                          );
                        }}
                        className={comboSelectClass}
                        aria-label="電話の種類"
                      >
                        <option value="mobile">携帯電話</option>
                        <option value="home">自宅</option>
                      </select>
                      <input
                        type="tel"
                        value={row.value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setPhones((prev) =>
                            prev.map((x, j) => (j === i + 1 ? { ...x, value: v } : x)),
                          );
                        }}
                        placeholder="090-1234-5678"
                        className={comboInputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SectionTile>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end gap-2 px-6 pb-6 pt-2 flex-shrink-0 border-t border-gray-200 bg-white rounded-b-lg">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? '登録中...' : 'アカウント作成'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
