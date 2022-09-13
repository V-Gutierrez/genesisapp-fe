export const booleanToString = (value: boolean) => (value ? 'Sim' : 'Não')

export const regionTranslate = (value: UserRegion) => {
  switch (true) {
    case value === 'FEC':
      return 'Feira de Santana'
    case value === 'AEP':
      return 'Buenos Aires'
    default:
      return '-'
  }
}
