import { Beneficiary, BeneficiaryModel } from '../../domain'
import { IBeneficiaryService } from '../../interfaces'
import { GenericService } from '../core'
export class BeneficiaryService extends GenericService<Beneficiary> implements IBeneficiaryService {
  constructor () {
    super(BeneficiaryModel)
  }

  async GetBySender (sender: string): Promise<Beneficiary[]> {
    return await BeneficiaryModel.find({ sender }).exec()
  }
}
