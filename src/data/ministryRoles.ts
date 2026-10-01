export interface MinistryRoleDefinition {
  id: string;
  label: string;
  description: string;
  badgeBg: string;
  borderColor: string;
  badgeText: string;
  calling: string;
  defaultCalling?: string;
  isAdminRole?: boolean;
}

export const ADMIN_SECURITY_PASSCODE = 'FIRE2026';

export const MINISTRY_ROLES: MinistryRoleDefinition[] = [
  {
    id: 'disciple',
    label: 'Word Disciple',
    description: 'Committed to weekly sword check-in, discipleship vault study, and prayer.',
    badgeBg: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    calling: 'Consecrated Disciple of the Word',
    defaultCalling: 'Consecrated Disciple of the Word'
  },
  {
    id: 'intercessor',
    label: 'Prayer Warrior & Intercessor',
    description: 'Standing on the 24/7 prayer wall, interceding for souls and divine breakthrough.',
    badgeBg: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    calling: 'Watchman on the Sacred Wall',
    defaultCalling: 'Watchman on the Sacred Wall'
  },
  {
    id: 'praise_worship',
    label: 'Praise & Worship Psalmist',
    description: 'Ministering through holy music, instruments, and corporate encounter worship.',
    badgeBg: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    calling: 'Sanctuary Psalmist & Worship Leader',
    defaultCalling: 'Sanctuary Psalmist & Worship Leader'
  },
  {
    id: 'huddle_host',
    label: 'Small Group Huddle Host',
    description: 'Opening fellowship space for Men on Fire and Women Ignited weekly huddles.',
    badgeBg: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    calling: 'Small Group Shepherd & Host',
    defaultCalling: 'Small Group Shepherd & Host'
  },
  {
    id: 'media_creative',
    label: 'Media & Creative Vision',
    description: 'Documenting the moves of God through camera, stream broadcasting, and design.',
    badgeBg: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    calling: 'Sanctuary Media & Visual Arts',
    defaultCalling: 'Sanctuary Media & Visual Arts'
  },
  {
    id: 'overseer',
    label: 'Lead Facilitator & Overseer',
    description: 'Executive administration, pastoral council, and ministry governance.',
    badgeBg: 'bg-amber-500/20',
    borderColor: 'border-amber-400',
    badgeText: 'text-amber-300',
    calling: 'Sanctuary Leadership & Overseer',
    defaultCalling: 'Sanctuary Leadership & Overseer',
    isAdminRole: true
  }
];

export function getRoleById(id: string): MinistryRoleDefinition {
  return MINISTRY_ROLES.find(r => r.id === id) || MINISTRY_ROLES[0];
}
