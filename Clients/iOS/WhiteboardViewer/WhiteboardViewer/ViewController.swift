//
//  ViewController.swift
//  WhiteboardViewer
//
//  Created by John Austin on 12/10/14.
//  Copyright (c) 2014 Microsoft. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var webView: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let url = NSURL(string: "http://agavewhiteboardserver.azurewebsites.net/home/whiteboard/bing")
        
        let request = NSURLRequest(URL: url!)
        
        webView.loadRequest(request)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

