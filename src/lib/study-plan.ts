export interface DailyTask {
  day: string
  material: string
  target: string
  duration: string
  subjectType: string
  completed: boolean
}

export interface StudyWeek {
  week: number
  month: number
  focus: string
  days: DailyTask[]
}

export const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export const subjectsTWK = [
  'Pancasila - Dasar & Sejarah', 'UUD 1945 & Amandemen', 'Bhineka Tunggal Ika',
  'NKRI & Wawasan Kebangsaan', 'Sistem Pemerintahan Indonesia', 'Sejarah Nasional',
  'Hak & Kewajiban Warga Negara', 'Pilar Kebangsaan', 'Integritas Nasional',
  'Bela Negara', 'Demokrasi Pancasila', 'Reformasi Birokrasi'
]

export const subjectsTIU = [
  'Numerik - Aritmatika Dasar', 'Numerik - Deret Angka', 'Numerik - Perbandingan',
  'Verbal - Sinonim Antonim', 'Verbal - Analogi', 'Verbal - Pemahaman Wacana',
  'Logika - Silogisme', 'Logika - Penalaran Analitis', 'Figural - Pola Gambar',
  'Figural - Rotasi & Refleksi', 'Numerik - Soal Cerita', 'Logika - Pernyataan'
]

export const subjectsTKP = [
  'Integritas Diri', 'Semangat Berprestasi', 'Orientasi Pelayanan',
  'Kemampuan Adaptasi', 'Kerja Sama Tim', 'Kreativitas & Inovasi',
  'Pengendalian Diri', 'Kepemimpinan', 'Profesionalisme',
  'Etika Publik', 'Pelayanan Publik', 'Jejaring Kerja'
]

export const catSubjects = [
  'Pengenalan Format CAT', 'Latihan CAT - TWK', 'Latihan CAT - TIU',
  'Latihan CAT - TKP', 'Simulasi CAT Penuh', 'Review Hasil CAT',
  'Strategi CAT', 'Manajemen Waktu CAT', 'Tryout CAT 1',
  'Tryout CAT 2', 'Tryout CAT 3', 'Evaluasi Final CAT'
]

export const durations = ['1 jam', '1.5 jam', '2 jam', '2.5 jam', '3 jam', '1 jam', '2 jam']

export function generateStudyPlan(): StudyWeek[] {
  const plan: StudyWeek[] = []

  for (let week = 1; week <= 12; week++) {
    const monthIndex = week <= 4 ? 0 : week <= 8 ? 1 : 2
    const focusPrefix = monthIndex === 0 ? 'Dasar' : monthIndex === 1 ? 'Pendalaman' : 'Tryout'

    let focusArea = ''
    if (week === 1 || week === 5 || week === 9) focusArea = `${focusPrefix} TWK & Pengenalan`
    else if (week === 2 || week === 6 || week === 10) focusArea = `${focusPrefix} TIU & Numerik`
    else if (week === 3 || week === 7 || week === 11) focusArea = `${focusPrefix} TKP & Karakteristik`
    else focusArea = `${focusPrefix} CAT & Simulasi`

    const days: DailyTask[] = []
    for (let d = 0; d < 7; d++) {
      const dayIndex = d
      const isSunday = dayIndex === 6
      let material, target, duration, subjectType

      if (isSunday) {
        material = 'Review Ringan & Istirahat Aktif'
        target = 'Mengulang materi minggu ini secara santai'
        duration = '1 jam'
        subjectType = 'Review'
      } else {
        const subjectPool = week <= 4
          ? [subjectsTWK, subjectsTIU, subjectsTKP, catSubjects]
          : week <= 8
          ? [subjectsTIU, subjectsTKP, subjectsTWK, catSubjects]
          : [catSubjects, subjectsTWK, subjectsTIU, subjectsTKP]

        const poolIndex = d % 4
        const subjIdx = (week - 1 + d) % 12
        material = subjectPool[poolIndex][subjIdx]
        target = `Memahami dan menguasai ${material.toLowerCase()}`
        duration = durations[(week + d) % 7]
        subjectType = poolIndex === 0 ? (week <= 4 ? 'TWK' : week <= 8 ? 'TIU' : 'CAT')
          : poolIndex === 1 ? (week <= 4 ? 'TIU' : week <= 8 ? 'TKP' : 'TWK')
          : poolIndex === 2 ? (week <= 4 ? 'TKP' : week <= 8 ? 'TWK' : 'TIU')
          : 'CAT'
      }

      days.push({
        day: dayNames[dayIndex],
        material,
        target,
        duration,
        subjectType,
        completed: false,
      })
    }
    plan.push({
      week,
      month: monthIndex + 1,
      focus: focusArea,
      days,
    })
  }
  return plan
}

export const defaultStudyPlan = generateStudyPlan()
