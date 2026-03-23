import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  return (
    <header className="flex items-center justify-between shadow-[0_4px_8px_rgba(0,0,0,0.15)] flex-row p-1 pl-48">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-semibold text-gray-400">管理CMS</h1>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-gray-500">admin:Aテスト本社</p>
        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        <p className="text-sm text-gray-500">テスト管理者 ユーザー</p>
      </div>
    </header>
  );
}