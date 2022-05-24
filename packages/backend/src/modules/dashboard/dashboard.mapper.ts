/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardDTO from 'packages/shared/src/api/dto/dashboard.dto'
import { Dashboard } from './dashboard'
import { Mapper } from '../../application/Mapper'

export class DashboardMapper implements Mapper<Dashboard, any, DashboardDTO> {
  public mapToDomain(raw: any): Dashboard {
    return new Dashboard(
      raw._id,
      raw.title,
      raw.description,
      raw.imageCoverUrl,
      raw.users,
      raw.status,
      raw.createdAt
    )
  }

  public mapToPersistence(dashboard: Dashboard): any {
    return { _id: dashboard.id, title: dashboard.title }
  }

  public mapToDto(dashboard: Dashboard): DashboardDTO {
    return {
      id: dashboard.id,
      title: dashboard.title,
      description: dashboard.description,
      imageCoverUrl: dashboard.imageCoverUrl,
      users: dashboard.users,
      status: dashboard.status,
      columns: [],
      createdAt: dashboard.createdAt
    }
  }
}

const dashboardMapper = new DashboardMapper()
export { dashboardMapper }
