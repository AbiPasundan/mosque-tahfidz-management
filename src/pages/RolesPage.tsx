import { LuShield, LuPlus, LuTrash2, LuPencil } from 'react-icons/lu';
import { Link } from 'react-router';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
}

const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage Users'],
    users: 2,
  },
  {
    id: '2',
    name: 'Teacher',
    description: 'Can manage students and record progress',
    permissions: ['Read', 'Update', 'Record Progress'],
    users: 8,
  },
  {
    id: '3',
    name: 'Staff',
    description: 'Limited access for administrative tasks',
    permissions: ['Read', 'Update'],
    users: 3,
  },
];

export default function RolesPage() {
  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Role Management</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div>
          <h1 className="text-h1 text-on-surface font-[Manrope]">Roles & Permissions</h1>
          <p className="text-body-md text-muted mt-xs">
            Manage user roles and access control.
          </p>
        </div>
        <button className="flex items-center gap-sm px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors flex-shrink-0">
          <LuPlus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-surface-container-lowest rounded-xl border border-border-card p-lg hover:shadow-card transition-all"
          >
            <div className="flex items-start justify-between mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LuShield className="w-[18px] h-[18px] text-primary" />
                </div>
                <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">{role.name}</h3>
              </div>
              <div className="flex gap-xs">
                <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" aria-label="Edit role">
                  <LuPencil className="w-3.5 h-3.5 text-muted" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-error-container/50 transition-colors" aria-label="Delete role">
                  <LuTrash2 className="w-3.5 h-3.5 text-error" />
                </button>
              </div>
            </div>
            <p className="text-[13px] text-muted mb-md">{role.description}</p>
            <div className="mb-md">
              <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Permissions</p>
              <div className="flex flex-wrap gap-[6px]">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="px-2.5 py-0.5 bg-primary/[0.08] text-primary rounded-full text-[11px] font-medium"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[12px] text-muted">
              {role.users} user{role.users !== 1 ? 's' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
