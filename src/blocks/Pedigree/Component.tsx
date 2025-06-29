import React from 'react'
import type { PedigreeBlock as PedigreeBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const PedigreeBlock: React.FC<PedigreeBlockProps> = (props) => {
  const { fatherName, motherName, fatherImage, motherImage, pedigreeData } = props

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {/* Left column (1/3) with images and name */}
        <div className="col-span-4 lg:col-span-4">
          <div className="flex flex-col gap-4">
            {fatherImage && <Media imgClassName="w-full" resource={fatherImage} />}
            {fatherName && (
              <h3 className="text-xl font-semibold text-center mt-1 mb-4">{fatherName}</h3>
            )}
            {motherImage && <Media imgClassName="w-full" resource={motherImage} />}
            {motherName && <h3 className="text-xl font-semibold text-center mt-2">{motherName}</h3>}
          </div>
        </div>

        {/* Right column (2/3) with pedigree table */}
        <div className="col-span-4 lg:col-span-8 flex justify-items-center">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className={'bg-primary'}>
                <th className="border border-gray-300 p-2 text-center">Vater</th>
                <th className="border border-gray-300 p-2 text-center">Großeltern</th>
                <th className="border border-gray-300 p-2 text-center">Urgroßeltern</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1-4: Father's side */}
              <tr>
                <td className="border border-gray-300 p-2" rowSpan={4}>
                  {pedigreeData?.father || 'Vater'}
                </td>
                <td className="border border-gray-300 p-2" rowSpan={2}>
                  {pedigreeData?.fathersFather || 'Großvater (väterlich)'}
                </td>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.fathersFathersFather || 'Urgroßvater'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.fathersFathersMother || 'Urgroßmutter'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2" rowSpan={2}>
                  {pedigreeData?.fathersMother || 'Großmutter (väterlich)'}
                </td>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.fathersMothersFather || 'Urgroßvater'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.fathersMothersMother || 'Urgroßmutter'}
                </td>
              </tr>

              {/* Header row for Mother's side */}
              <tr className={'bg-primary'}>
                <th className="border border-gray-300 p-2 text-center">Mutter</th>
                <th className="border border-gray-300 p-2 text-center">Großeltern</th>
                <th className="border border-gray-300 p-2 text-center">Urgroßeltern</th>
              </tr>

              {/* Row 6-9: Mother's side */}
              <tr>
                <td className="border border-gray-300 p-2" rowSpan={4}>
                  {pedigreeData?.mother || 'Mutter'}
                </td>
                <td className="border border-gray-300 p-2" rowSpan={2}>
                  {pedigreeData?.mothersFather || 'Großvater (mütterlich)'}
                </td>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.mothersFathersFather || 'Urgroßvater'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.mothersFathersMother || 'Urgroßmutter'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2" rowSpan={2}>
                  {pedigreeData?.mothersMother || 'Großmutter (mütterlich)'}
                </td>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.mothersMothersFather || 'Urgroßvater'}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {pedigreeData?.mothersMothersMother || 'Urgroßmutter'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
