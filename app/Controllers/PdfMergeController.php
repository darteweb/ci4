<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use setasign\Fpdi\Fpdi;

class PdfMergeController extends BaseController
{
    public function index()
    {
        // 
    }

    public function mergePDF($files = array())
    {
        if(empty($files)){
            $file_1 = FCPATH . 'public/file-1.pdf';
            $file_2 = FCPATH . 'public/file-2.pdf';
            // $file_3 = FCPATH . 'public/favicon.ico';
    
            $files = [$file_1, $file_2];
        }

        $pdf = new Fpdi();

        foreach ($files as $file) {
            // set the source file and get the number of pages in the document
            $pageCount =  $pdf->setSourceFile($file);

            for ($i = 0; $i < $pageCount; $i++) {
                //create a page
                $pdf->AddPage();
                //import a page then get the id and will be used in the template
                $tplId = $pdf->importPage($i + 1);
                //use the template of the imporated page
                $pdf->useTemplate($tplId);
            }
        }

        //display the generated PDF
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        readfile($pdf->Output());
    }

    public function convertToPdf()
    {
        $file_pdf = \Config\Services::image()
            ->withFile(FCPATH . 'public/cam_truck.jpg')
            ->convert(IMAGETYPE_PNG)
            ->save(FCPATH . 'public/cam_truck.png');

        print_r($file_pdf);
    }
}
