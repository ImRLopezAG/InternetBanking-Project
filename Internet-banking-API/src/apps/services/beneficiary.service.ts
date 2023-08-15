import { Beneficiary, BeneficiaryModel, User, UserModel } from '../../domain'
import { IBeneficiaryService } from '../../interfaces'
import { GenericService } from '../core'
export class BeneficiaryService extends GenericService<Beneficiary> implements IBeneficiaryService {
  constructor () {
    super(BeneficiaryModel)
  }

  override async Create (beneficiary: Beneficiary): Promise<Beneficiary> {
    const { sender, receptor } = beneficiary
    return await BeneficiaryModel.findOne({ sender, receptor }).exec().then(async (result) => {
      if (result) {
        return result
      } else {
        return await super.Create(beneficiary)
      }
    })
  }

  async GetBySender (sender: string): Promise<User[]> {
    const beneficiaries = await BeneficiaryModel.find({ sender }).exec()
    return await UserModel.find({ _id: { $in: beneficiaries.map((beneficiary) => beneficiary.receptor) } }).exec()
  }

  async DeleteWithBody (beneficiary: Beneficiary): Promise<void> {
    const { sender, receptor } = beneficiary
    await BeneficiaryModel.findOneAndDelete({ sender, receptor }).exec()
  }
}
