import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export function createDatabase(dbPath) {
  const isMemory = dbPath === ':memory:'

  if (!isMemory) {
    const dbDir = path.dirname(dbPath)
    fs.mkdirSync(dbDir, { recursive: true })
  }

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')

  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      full_name TEXT,
      primary_location TEXT,
      phone TEXT,
      email TEXT NOT NULL,
      interest TEXT NOT NULL,
      support_focus_json TEXT,
      support_focus_other TEXT,
      gp_registered TEXT,
      gp_details TEXT,
      high_risk_exclusions_json TEXT,
      guidance_preference TEXT,
      ack_not_emergency_service INTEGER NOT NULL DEFAULT 0,
      ack_urgent_escalation INTEGER NOT NULL DEFAULT 0,
      ack_invitation_only INTEGER NOT NULL DEFAULT 0,
      ack_professional_boundaries INTEGER NOT NULL DEFAULT 0,
      ack_information_accuracy INTEGER NOT NULL DEFAULT 0,
      message TEXT,
      emergency_confirmed INTEGER NOT NULL DEFAULT 0,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const columns = db.prepare('PRAGMA table_info(enquiries)').all()
  const hasEmergencyConfirmed = columns.some((column) => column.name === 'emergency_confirmed')
  if (!hasEmergencyConfirmed) {
    db.exec('ALTER TABLE enquiries ADD COLUMN emergency_confirmed INTEGER NOT NULL DEFAULT 0')
  }
  const hasFullName = columns.some((column) => column.name === 'full_name')
  if (!hasFullName) {
    db.exec('ALTER TABLE enquiries ADD COLUMN full_name TEXT')
  }
  const hasPrimaryLocation = columns.some((column) => column.name === 'primary_location')
  if (!hasPrimaryLocation) {
    db.exec('ALTER TABLE enquiries ADD COLUMN primary_location TEXT')
  }
  const hasPhone = columns.some((column) => column.name === 'phone')
  if (!hasPhone) {
    db.exec('ALTER TABLE enquiries ADD COLUMN phone TEXT')
  }
  const hasSupportFocusJson = columns.some((column) => column.name === 'support_focus_json')
  if (!hasSupportFocusJson) {
    db.exec('ALTER TABLE enquiries ADD COLUMN support_focus_json TEXT')
  }
  const hasSupportFocusOther = columns.some((column) => column.name === 'support_focus_other')
  if (!hasSupportFocusOther) {
    db.exec('ALTER TABLE enquiries ADD COLUMN support_focus_other TEXT')
  }
  const hasGpRegistered = columns.some((column) => column.name === 'gp_registered')
  if (!hasGpRegistered) {
    db.exec('ALTER TABLE enquiries ADD COLUMN gp_registered TEXT')
  }
  const hasGpDetails = columns.some((column) => column.name === 'gp_details')
  if (!hasGpDetails) {
    db.exec('ALTER TABLE enquiries ADD COLUMN gp_details TEXT')
  }
  const hasHighRiskExclusionsJson = columns.some((column) => column.name === 'high_risk_exclusions_json')
  if (!hasHighRiskExclusionsJson) {
    db.exec('ALTER TABLE enquiries ADD COLUMN high_risk_exclusions_json TEXT')
  }
  const hasGuidancePreference = columns.some((column) => column.name === 'guidance_preference')
  if (!hasGuidancePreference) {
    db.exec('ALTER TABLE enquiries ADD COLUMN guidance_preference TEXT')
  }
  const hasAckNotEmergencyService = columns.some((column) => column.name === 'ack_not_emergency_service')
  if (!hasAckNotEmergencyService) {
    db.exec('ALTER TABLE enquiries ADD COLUMN ack_not_emergency_service INTEGER NOT NULL DEFAULT 0')
  }
  const hasAckUrgentEscalation = columns.some((column) => column.name === 'ack_urgent_escalation')
  if (!hasAckUrgentEscalation) {
    db.exec('ALTER TABLE enquiries ADD COLUMN ack_urgent_escalation INTEGER NOT NULL DEFAULT 0')
  }
  const hasAckInvitationOnly = columns.some((column) => column.name === 'ack_invitation_only')
  if (!hasAckInvitationOnly) {
    db.exec('ALTER TABLE enquiries ADD COLUMN ack_invitation_only INTEGER NOT NULL DEFAULT 0')
  }
  const hasAckProfessionalBoundaries = columns.some((column) => column.name === 'ack_professional_boundaries')
  if (!hasAckProfessionalBoundaries) {
    db.exec('ALTER TABLE enquiries ADD COLUMN ack_professional_boundaries INTEGER NOT NULL DEFAULT 0')
  }
  const hasAckInformationAccuracy = columns.some((column) => column.name === 'ack_information_accuracy')
  if (!hasAckInformationAccuracy) {
    db.exec('ALTER TABLE enquiries ADD COLUMN ack_information_accuracy INTEGER NOT NULL DEFAULT 0')
  }

  return db
}
