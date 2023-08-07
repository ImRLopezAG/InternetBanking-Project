import { UserRole } from '../../utils'
import { Beneficiary, BeneficiaryModel, User, UserModel } from '../../domain'
import { IBeneficiaryService } from '../../interfaces'
import { GenericService } from '../core'
export class BeneficiaryService extends GenericService<Beneficiary> implements IBeneficiaryService {
  constructor () {
    super(BeneficiaryModel)
  }

  async GetBySender (sender: string): Promise<User[]> {
    const beneficiaries = await BeneficiaryModel.find({ sender }).exec()
    return await UserModel.find({ $and: [{ _id: { $in: beneficiaries } }, { role: UserRole.Client }] }).exec()  }
}
