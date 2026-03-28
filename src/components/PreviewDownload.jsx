import { SERVICE_TYPES } from '../data/serviceTypes'
import { buildComponentBuildInfos } from '../lib/buildJson'

const BASE_PERMISSIONS = new Set([
  'android.permission.POST_NOTIFICATIONS',
  'android.permission.FOREGROUND_SERVICE',
  'android.permission.WAKE_LOCK',
  'android.permission.RECEIVE_BOOT_COMPLETED',
])

const strip = id => id.replace('android.permission.', '')

export default function PreviewDownload({ selectedIds, additionalPermissions, specialUseText }) {
  const selectedTypes = SERVICE_TYPES.filter(t => selectedIds.has(t.id))
  const json = buildComponentBuildInfos({ selectedTypeIds: selectedIds, additionalPermissions, specialUseText })
  const extraPermissions = json[0].permissions.filter(p => !BASE_PERMISSIONS.has(p))

  return (
    <div className="summary-card">

        <div className="summary-section">
          <span className="summary-section-title">Service types</span>
          <div className="summary-type-list">
            {selectedTypes.map(t => (
              <div key={t.id} className="summary-type-row">
                <span className="summary-dot" />
                <span className="summary-type-label">{t.label}</span>
                <code className="summary-xml-type">{t.xmlType}</code>
              </div>
            ))}
          </div>
        </div>

        {extraPermissions.length > 0 && (
          <div className="summary-section summary-section-border">
            <span className="summary-section-title">Extra permissions</span>
            <div className="summary-perm-chips">
              {extraPermissions.map(p => (
                <span key={p} className="summary-chip">{strip(p)}</span>
              ))}
            </div>
          </div>
        )}

        {selectedIds.has('specialUse') && specialUseText.trim() && (
          <div className="summary-section summary-section-border">
            <span className="summary-section-title">Special use description</span>
            <p className="summary-special-text">&ldquo;{specialUseText.trim()}&rdquo;</p>
          </div>
        )}

    </div>
  )
}
