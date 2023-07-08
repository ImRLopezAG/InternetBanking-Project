import { Beneficiary } from '../../domain/models'
import { IGenericService } from '../../utils/constants'

export interface IBeneficiaryService extends IGenericService<Beneficiary> {
  GetBySender: (sender: string) => Promise<Beneficiary[]>
}
