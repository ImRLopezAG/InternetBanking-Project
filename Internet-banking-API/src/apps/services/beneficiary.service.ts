import { Beneficiary, BeneficiaryModel, User, UserModel } from '../../domain'
import { IBeneficiaryService } from '../../interfaces'
import { GenericService } from '../core'
export class BeneficiaryService extends GenericService<Beneficiary> implements IBeneficiaryService {
  constructor () {
    super(BeneficiaryModel)
  }

  async GetBySender (sender: string): Promise<User[]> {
    const beneficiaries = await BeneficiaryModel.find({ sender }).exec()
    return await UserModel.find({ _id: { $in: beneficiaries.map(b => b.receptor) } }).exec()
  }
}
